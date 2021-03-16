import './Card.css';

interface CardProps {
  direction: 'vertical' | 'horizontal';
  title: string;
  subtitle?: string;
}
const Card = (props: CardProps) => {
  const { direction, title } = props;
  const subtitle: string = props.subtitle || '';
  const artwork: string =
    direction === 'horizontal'
      ? 'https://picsum.photos/200'
      : 'https://picsum.photos/80';

  return (
    <div className={`card__${direction}-item`}>
      <img
        className={`card__${direction}-item__image`}
        src={artwork}
        alt={`Album Art`}
      />
      <div className={`card__${direction}-item__name`}>
        <h3>{title}</h3>
        {subtitle !== '' ? <p>{subtitle}</p> : <></>}
      </div>
    </div>
  );
};

export default Card;
