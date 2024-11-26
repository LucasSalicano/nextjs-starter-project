import classes from './page.module.css';
import Image from "next/image";
import Link from "next/link";
import {getMealBySlug} from "@/lib/meals";

export default function MealDetailPage({params}) {
    const meal = getMealBySlug(params.mealSlug);
    meal.instructions = meal.instructions.replace(/\n/g, '<br>');
    return (
        <>
            <header className={classes.header}>
                <div className={classes.image}>
                    <Image src={meal.image} alt={meal.title} fill/>
                </div>
                <div className={classes.headerText}>
                    <h1>{meal.title}</h1>
                    <p className={classes.creator}>
                        by <Link href={`mailto:${meal.creator_email}`}>
                        {meal.creator}
                    </Link>
                    </p>
                    <p className={classes.summary}>
                        {meal.summary}
                    </p>
                </div>
            </header>
            <main>
                <p
                    className={classes.instructions}
                    dangerouslySetInnerHTML={{
                        __html: meal.instructions,
                }}></p>
            </main>
        </>
    );
}