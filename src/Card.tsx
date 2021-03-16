import './Card.css';

interface CardProps {
  direction: 'vertical' | 'horizontal';
  title: string;
  subtitle?: string;
}
const Card = (props: CardProps) => {
  const { direction, title } = props;
  const subtitle: string = props.subtitle || '';

  return (
    <div className={`card__${direction}-item`}>
      <div className={`card__${direction}-item__image`}></div>
      <div className={`card__${direction}-item__name`}>
        <h3>{title}</h3>
        {subtitle !== '' ? <p>{subtitle}</p> : <></>}
      </div>
    </div>
  );
};

export default Card;
