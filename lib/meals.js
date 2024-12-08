import sql from 'better-sqlite3';
import slugify from "slugify";
import xss from "xss";
import fs from 'node:fs';

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

export async function saveMeal(meal) {
    try {
        meal.slug = slugify(meal.title, {lower: true});
        meal.instructions = xss(meal.instructions);
        meal.summary = xss(meal.summary);
        meal.title = xss(meal.title);
        meal.creator = xss(meal.creator);
        meal.creator_email = xss(meal.creator_email);

        const extension = meal.image.name.split('.').pop();
        const randomName = Math.random().toString(36).substring(2, 15);
        const fileName = `${randomName}.${extension}`;
        const newPath = `public/images/${fileName}`;

        const stream = fs.createWriteStream(newPath);
        const bufferedImage = await meal.image.arrayBuffer();
        stream.write(Buffer.from(bufferedImage), (error) => {
            if (error) {
                stream.end();
                throw new Error('Saving image failed!');
            }
            stream.end();
        });

        meal.image = '/images/' + fileName;
        const stmt = db.prepare(
            `INSERT INTO meals
                 (title, summary, instructions, image, creator, creator_email, slug)
             VALUES (?, ?, ?, ?, ?, ?, ?)`
        );

        stmt.run(
            meal.title,
            meal.summary,
            meal.instructions,
            meal.image,
            meal.creator,
            meal.creator_email,
            meal.slug
        );

        return {
            message: 'Meal added successfully.'
        };
    } catch (error) {
        throw new Error('Failed to add meal: ' + error.message);
    }
}