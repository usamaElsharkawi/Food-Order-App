import { currencyFormatter } from "../util/formatting";

export default function MealItem({ meal }) {
  return (
    <li>
      <article className="meal-item">
        <img src={`http://localhost:3000/${meal.image}`} alt={meal.name} />
        <h3>{meal.name}</h3>
        <p className="meal-item-description">{meal.description}</p>
        <p className="meal-item-price">
          {currencyFormatter.format(meal.price)}
        </p>
        <p className="meal-item-actions">
          <button>Add to Cart</button>
        </p>
      </article>
    </li>
  );
}
