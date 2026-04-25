type Props = {
  imageSrc: string;
  name: string;
  olfaction: string[];
  ingredients: string;
};

export default function PreorderEmailProduct({
  imageSrc,
  name,
  olfaction,
  ingredients,
}: Props) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'flex-start',
        gap: '32px',
        fontFamily: 'Helvetica, Arial, sans-serif',
        color: '#000',
        fontSize: '14px',
        lineHeight: '1.5',
        maxWidth: '900px',
      }}
    >
      <img
        src={imageSrc}
        alt={name}
        width={360}
        height={360}
        style={{
          display: 'block',
          width: '360px',
          height: '360px',
          objectFit: 'cover',
          backgroundColor: '#eeeeee',
          flexShrink: 0,
        }}
      />

      <div style={{ flex: 1, paddingTop: '4px' }}>
        <div style={{ fontWeight: 700, marginBottom: '20px' }}>{name}</div>

        <div style={{ marginBottom: '20px' }}>
          <span style={{ fontWeight: 400 }}>Olfaction: </span>
          {olfaction.join(', ')}
        </div>

        <div>
          <span style={{ fontWeight: 400 }}>Ingredients: </span>
          {ingredients}
        </div>
      </div>
    </div>
  );
}
