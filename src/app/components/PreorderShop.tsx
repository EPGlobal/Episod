'use client';

import { useMemo, useState } from 'react';
import Image from 'next/image';
import { medusa } from '@/lib/medusa';

type MedusaProduct = {
  id: string;
  handle?: string | null;
  title?: string | null;
  description?: string | null;
  variants?: Array<{
    id: string;
    title?: string | null;
    calculated_price?: {
      calculated_amount?: number | null;
      currency_code?: string | null;
    } | null;
  }> | null;
};

type DisplayProduct = {
  id: string;
  handle: string;
  name: string;
  volume: string;
  descriptor: string;
  price: number;
  currency: string;
  variantId: string;
  images: string[];
};

const IMAGE_MAP: Record<string, string[]> = {
  '852-hz': ['/preorder/852hz-front.webp', '/preorder/852hz-side.webp'],
  'no-signal': ['/preorder/nosignal-front.webp', '/preorder/nosignal-side.webp'],
  'source-code': ['/preorder/sourcecode-front.webp', '/preorder/sourcecode-side.webp'],
};

const HANDLE_ORDER = ['852-hz', 'no-signal', 'source-code'];

const formatPrice = (amount: number, currency: string) => {
  const upper = currency.toUpperCase();
  const symbol = upper === 'EUR' ? '€' : upper === 'USD' ? '$' : upper === 'GBP' ? '£' : '';
  return symbol ? `${symbol}${amount}` : `${amount} ${upper}`;
};

function PlusIcon({ className = 'w-3 h-3' }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className={`${className} stroke-2 shrink-0`}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
    </svg>
  );
}

function MinusIcon({ className = 'w-3 h-3' }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className={`${className} stroke-2 shrink-0`}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14" />
    </svg>
  );
}

export default function PreorderShop({ products: rawProducts }: { products: MedusaProduct[] }) {
  const products = useMemo<DisplayProduct[]>(
    () =>
      rawProducts
        .map((p): DisplayProduct => {
          const variant = p.variants?.[0];
          const price = variant?.calculated_price;
          const amount = price?.calculated_amount ?? 0;
          const currency = price?.currency_code ?? 'eur';
          const handle = p.handle ?? '';
          return {
            id: p.id,
            handle,
            name: (p.title ?? '').toUpperCase(),
            volume: '50ML EAU DE PARFUM',
            descriptor: p.description ?? '',
            price: amount,
            currency,
            variantId: variant?.id ?? '',
            images: IMAGE_MAP[handle] ?? [],
          };
        })
        .filter(p => p.variantId)
        .sort((a, b) => {
          const ai = HANDLE_ORDER.indexOf(a.handle);
          const bi = HANDLE_ORDER.indexOf(b.handle);
          return (ai === -1 ? 99 : ai) - (bi === -1 ? 99 : bi);
        }),
    [rawProducts]
  );

  const [selectedId, setSelectedId] = useState<string>(products[0]?.id ?? '');
  const [qty, setQty] = useState(1);
  const [cart, setCart] = useState<Record<string, number>>({});
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [checkoutError, setCheckoutError] = useState<string | null>(null);

  const selected = useMemo(
    () => products.find(p => p.id === selectedId),
    [products, selectedId]
  );

  const cartLines = useMemo(
    () =>
      products
        .filter(p => cart[p.id])
        .map(p => ({ product: p, qty: cart[p.id] })),
    [products, cart]
  );
  const cartTotal = cartLines.reduce((s, l) => s + l.product.price * l.qty, 0);
  const cartCount = cartLines.reduce((s, l) => s + l.qty, 0);
  const hasItems = cartCount > 0;
  const cartCurrency = cartLines[0]?.product.currency ?? 'eur';

  const addToOrder = () => {
    if (!selected) return;
    setCart(prev => ({
      ...prev,
      [selected.id]: (prev[selected.id] ?? 0) + qty,
    }));
    setQty(1);
  };

  const removeFromOrder = (id: string) => {
    setCart(prev => {
      const next = { ...prev };
      delete next[id];
      return next;
    });
  };

  const selectProduct = (id: string) => {
    setSelectedId(id);
    setQty(1);
  };

  const handleCheckout = async () => {
    if (!hasItems || isCheckingOut) return;
    setIsCheckingOut(true);
    setCheckoutError(null);
    try {
      const origin = window.location.origin;
      const res = await medusa.client.fetch<{ url: string; id: string }>('/store/checkout', {
        method: 'POST',
        body: {
          items: cartLines.map(l => ({
            variant_id: l.product.variantId,
            quantity: l.qty,
          })),
          success_url: `${origin}/thanks?session_id={CHECKOUT_SESSION_ID}`,
          cancel_url: `${origin}/preorder`,
        },
      });
      if (res?.url) {
        window.location.href = res.url;
      } else {
        throw new Error('Missing checkout URL');
      }
    } catch (err) {
      console.error('Checkout failed', err);
      setCheckoutError('Could not start checkout. Please try again.');
      setIsCheckingOut(false);
    }
  };

  const renderShop = () => {
    if (!selected) return null;

    return (
      <div className="flex flex-col gap-8 w-full max-w-md mx-auto">
        {/* Header */}
        <div className="flex flex-col">
          <div className="text-base text-black">PREORDER</div>
          <div className="text-xs text-black mt-2">SHIPS JUNE 2026</div>
        </div>

        {/* Selector */}
        <div className="flex border-b border-black/15">
          {products.map(p => {
            const isActive = p.id === selectedId;
            return (
              <button
                key={p.id}
                type="button"
                onClick={() => selectProduct(p.id)}
                className={`text-xs flex-1 py-3 px-2 -mb-px border-b cursor-pointer transition-colors ${
                  isActive
                    ? 'text-black border-black'
                    : 'text-black/40 border-transparent hover:text-black/70'
                }`}
              >
                {p.name}
              </button>
            );
          })}
        </div>

        {/* Selected product */}
        <div className="flex flex-col gap-3">
          <div className="flex items-baseline justify-between gap-4">
            <div className="text-base text-black">{selected.name}</div>
            <div className="text-base text-black">
              {formatPrice(selected.price, selected.currency)}
            </div>
          </div>
          <div className="text-xs text-black/60">{selected.volume}</div>
          <div className="text-xs text-black/80 leading-relaxed">{selected.descriptor}</div>
        </div>

        {/* Quantity + Add */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <div className="text-xs text-black">QUANTITY</div>
            <div className="flex items-center border border-black h-9">
              <button
                type="button"
                onClick={() => setQty(Math.max(1, qty - 1))}
                className="flex items-center justify-center w-9 h-9 hover:bg-black hover:text-white transition-colors cursor-pointer"
                aria-label="Decrease quantity"
              >
                <MinusIcon />
              </button>
              <div className="text-xs text-black w-8 text-center select-none">{qty}</div>
              <button
                type="button"
                onClick={() => setQty(qty + 1)}
                className="flex items-center justify-center w-9 h-9 hover:bg-black hover:text-white transition-colors cursor-pointer"
                aria-label="Increase quantity"
              >
                <PlusIcon />
              </button>
            </div>
          </div>

          <button
            type="button"
            onClick={addToOrder}
            className="flex items-center justify-center gap-2 text-xs text-black border border-black h-11 hover:bg-black hover:text-white transition-colors cursor-pointer"
          >
            <PlusIcon />
            <span>ADD TO ORDER</span>
          </button>
        </div>

        {/* Order summary (only when items exist) */}
        {hasItems && (
          <div className="flex flex-col gap-3 border-t border-black/15 pt-6" aria-live="polite">
            <div className="text-xs text-black/60">YOUR ORDER</div>
            {cartLines.map(({ product, qty: lineQty }) => (
              <div key={product.id} className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-3 text-xs text-black/80 min-w-0">
                  <button
                    type="button"
                    onClick={() => removeFromOrder(product.id)}
                    className="text-black/40 hover:text-black bg-transparent border-none cursor-pointer leading-none text-base shrink-0"
                    aria-label={`Remove ${product.name}`}
                  >
                    ×
                  </button>
                  <span className="truncate">
                    {product.name} <span className="text-black/40">× {lineQty}</span>
                  </span>
                </div>
                <div className="text-xs text-black/80 shrink-0">
                  {formatPrice(product.price * lineQty, product.currency)}
                </div>
              </div>
            ))}
            <div className="flex items-center justify-between gap-4 pt-3 border-t border-black/15">
              <div className="text-xs text-black">TOTAL</div>
              <div className="text-xs text-black">{formatPrice(cartTotal, cartCurrency)}</div>
            </div>
          </div>
        )}

        {/* Preorder CTA — primary */}
        <button
          type="button"
          onClick={handleCheckout}
          disabled={!hasItems || isCheckingOut}
          className={`flex items-center justify-center gap-2 text-xs h-12 tracking-wider transition-colors ${
            hasItems && !isCheckingOut
              ? 'text-white bg-black hover:bg-black/85 cursor-pointer'
              : 'text-black/30 bg-black/5 cursor-not-allowed'
          }`}
        >
          {isCheckingOut
            ? 'PREPARING ORDER…'
            : hasItems
            ? `PREORDER — ${formatPrice(cartTotal, cartCurrency)}`
            : 'ADD A FRAGRANCE TO PREORDER'}
        </button>

        {checkoutError && (
          <div className="text-xs text-red-600 text-center">{checkoutError}</div>
        )}

        <div className="text-xs text-black/60 text-center">
          FREE WORLDWIDE SHIPPING · SHIPS JUNE 2026
        </div>
      </div>
    );
  };

  const renderGallery = () => (
    <div className="grid grid-cols-1 w-full">
      {products.map(p => {
        const isActive = p.id === selectedId;
        return (
          <div
            key={p.id}
            aria-hidden={!isActive}
            className={`col-start-1 row-start-1 flex flex-col w-full transition-opacity duration-300 ease-out ${
              isActive ? 'opacity-100' : 'opacity-0'
            }`}
          >
            {p.images.map((src, i) => (
              <div key={i} className="relative bg-gray-100 w-full pt-[133%]">
                <Image
                  src={src}
                  alt={`${p.name} ${i + 1}`}
                  fill
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        );
      })}
    </div>
  );

  return (
    <div>
      {/* Desktop */}
      <div className="hidden lg:flex">
        {renderGallery()}
        <div className="w-[53%] shrink-0 min-h-screen flex items-start sticky top-0 overflow-y-auto max-h-screen">
          <div className="p-8 lg:p-16 flex flex-col gap-8 w-full">{renderShop()}</div>
        </div>
      </div>

      {/* Mobile */}
      <div className="flex flex-col lg:hidden">
        <div className="p-8 flex flex-col gap-8">{renderShop()}</div>
        {renderGallery()}
      </div>
    </div>
  );
}
