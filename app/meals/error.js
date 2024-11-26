'use client';

export default function Error({error}) {
    return (
        <main className="error">
            <h1>There was an error!</h1>
            <p>Failed to fetch meals data.</p>
        </main>
    );
}