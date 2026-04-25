import Image from "next/image";
import Link from "next/link";
import Footer from "../components/Footer";
import PreorderShop from "../components/PreorderShop";
import AnimatedNavText from "../components/AnimatedNavText";
import { medusa, MEDUSA_REGION_ID } from "@/lib/medusa";

export const dynamic = "force-dynamic";

async function loadProducts() {
  try {
    const { products } = await medusa.store.product.list({
      fields:
        "id,handle,title,description,variants.id,variants.title,variants.calculated_price.*",
      region_id: MEDUSA_REGION_ID,
      limit: 20,
    });
    return products;
  } catch (err) {
    console.error("Failed to load products server-side", err);
    return [];
  }
}

export default async function PreorderPage() {
  const products = await loadProducts();

  return (
    <div>
      <div className="w-full flex items-center justify-between p-4 lg:pt-6 px-8 relative z-50">
        <Link href="/" aria-label="Home" className="block shrink-0">
          <Image
            src="/Symbol_Black.svg"
            alt="Episod"
            width={18}
            height={30}
            className="h-8 w-auto"
          />
        </Link>
        <AnimatedNavText />
        <div className="w-[18px] shrink-0" aria-hidden />
      </div>

      <PreorderShop products={products} />

      <Footer />
    </div>
  );
}
