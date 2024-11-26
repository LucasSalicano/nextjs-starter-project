import sql from 'better-sqlite3';

const db = sql('meals.db');

export async function getMeals() {
    try {
        await new Promise(resolve => setTimeout(resolve, 5000));
        return db.prepare('SELECT * FROM meals').all();
    } catch (error) {
        throw new Error('Failed to fetch meals data.');
    }
}

export function getMealBySlug(slug) {
    try {
        if (!slug) {
            throw new Error('No slug provided.');
        }
        return db.prepare('SELECT * FROM meals WHERE slug = ?').get(slug);
    } catch (error) {
        throw new Error('Failed to fetch meal data');
    }
}