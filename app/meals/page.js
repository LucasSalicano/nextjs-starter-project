import classes from './page.module.css';
import Link from "next/link";
import MealsGrid from "@/components/meals/meals-grid";
import {getMeals} from "@/lib/meals";
import {Suspense} from "react";

async function MealsData() {
    const meals = await getMeals();
    return <MealsGrid meals={meals}/>;
}

export default async function Meals() {
    const meals = await getMeals();
    return (
        <>
            <header className={classes.header}>
                <h1>
                    Delicious Meals, created <span className={classes.highlight}> by you </span>
                </h1>
                <p>
                    Choose your favorite meal from our broad selection of available meals and
                    enjoy a delicious lunch or dinner at home.
                </p>
                <p className={classes.cta}>
                    <Link href="/meals/share">
                        Share your own meal!
                    </Link>
                </p>
            </header>
            <main className={classes.main}>
                <Suspense fallback={<p className={classes.loading}>Loading meals...</p>}>
                    <MealsData/>
                </Suspense>
            </main>
        </>
    );
}