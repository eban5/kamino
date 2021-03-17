import './Card.css';

interface CardProps {
  direction: 'vertical' | 'horizontal';
  title: string;
  subtitle?: string;
  image?: string;
}
const Card = (props: CardProps) => {
  const { direction, title } = props;
  const subtitle: string = props.subtitle || '';
  const image: string = props.image || '';
  const artwork: string =
    direction === 'horizontal'
      ? 'https://picsum.photos/200'
      : 'https://picsum.photos/80';
  const cardImage = image !== '' ? image : artwork;
  return (
    <div className={`card__${direction}-item`}>
      <img
        className={`card__${direction}-item__image`}
        src={cardImage}
        alt={`Album Art`}
      />
      <div className={`card__${direction}-item__name`}>
        <h4>{title}</h4>
        {subtitle !== '' ? <p>{subtitle}</p> : <></>}
      </div>
    </div>
  );
};

export default Card;
