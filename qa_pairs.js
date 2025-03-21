// qa_pairs.js - Exposing the data globally for script.js
window.qaPairsData = [
    {
        "question": "Quel temps fait-il aujourd'hui ?",
        "answer": "Aujourd'hui, il fait beau avec un ciel dégagé et une température agréable de 22°C."
    },
    {
        "question": "Est-ce qu'il va pleuvoir demain ?",
        "answer": "Oui, des averses sont prévues demain après-midi, alors n'oubliez pas votre parapluie !"
    },
    {
        "question": "Quelle est la dernière version de l'iPhone ?",
        "answer": "La dernière version de l'iPhone est l'iPhone 14 Pro, sorti en septembre 2024."
    },
    {
        "question": "Comment puis-je protéger ma clé API ?",
        "answer": "Vous pouvez protéger votre clé API en utilisant des variables d'environnement, en configurant un serveur proxy, et en limitant les permissions de la clé."
    },
    {
        "question": "Quels sont les meilleurs endroits à visiter en France ?",
        "answer": "En France, vous pouvez visiter Paris, la Côte d'Azur, la région de la Loire avec ses châteaux, et la Bretagne pour ses paysages côtiers magnifiques."
    },
    {
        "question": "Ai-je besoin d'un visa pour voyager au Japon ?",
        "answer": "Cela dépend de votre nationalité. Les citoyens de nombreux pays peuvent entrer au Japon sans visa pour des séjours de courte durée."
    },
    {
        "question": "Comment faire une quiche lorraine ?",
        "answer": "Pour faire une quiche lorraine, vous aurez besoin de pâte brisée, de lardons, de crème fraîche, d'œufs, de fromage râpé, de sel et de poivre. Mélangez les ingrédients et faites cuire au four à 180°C pendant environ 30 minutes."
    },
    {
        "question": "Quelle est la recette d'un bon gâteau au chocolat ?",
        "answer": "Pour un gâteau au chocolat, vous aurez besoin de chocolat noir, de beurre, de sucre, d'œufs, de farine et de levure. Faites fondre le chocolat et le beurre, mélangez avec les autres ingrédients, et faites cuire au four à 180°C pendant 25-30 minutes."
    },
    {
        "question": "Quels sont les meilleurs livres à lire cette année ?",
        "answer": "Quelques recommandations de livres cette année incluent 'Le Maître des illusions' de Donna Tartt, 'La Peste' d'Albert Camus, et 'Sapiens' de Yuval Noah Harari."
    },
    {
        "question": "Quels films me recommandes-tu ?",
        "answer": "Je recommande 'Inception' de Christopher Nolan, 'Le Fabuleux Destin d'Amélie Poulain' de Jean-Pierre Jeunet, et 'Parasite' de Bong Joon-ho."
    },
    {
        "question": "Comment puis-je améliorer mon sommeil ?",
        "answer": "Pour améliorer votre sommeil, essayez de maintenir une routine de coucher régulière, évitez les écrans avant de dormir, et créez un environnement de sommeil confortable et sombre."
    },
    {
        "question": "Quels sont les bienfaits de l'exercice physique ?",
        "answer": "L'exercice physique améliore la santé cardiovasculaire, renforce les muscles, aide à maintenir un poids santé, réduit le stress et améliore l'humeur."
    },
    {
        "question": "Quel est le meilleur chien pour une famille ?",
        "answer": "Les labradors, les golden retrievers et les beagles sont souvent recommandés comme chiens de famille en raison de leur nature amicale et de leur patience avec les enfants."
    },
    {
        "question": "Comment prendre soin d'un chat ?",
        "answer": "Pour prendre soin d'un chat, assurez-vous de lui fournir de la nourriture de qualité, de l'eau fraîche, une litière propre, des jouets pour le stimuler, et des visites régulières chez le vétérinaire."
    }
];

// Add some generic responses for common questions
window.qaPairsData.push(
    {
        "question": "bonjour",
        "answer": "Bonjour ! Comment puis-je vous aider aujourd'hui ?"
    },
    {
        "question": "salut",
        "answer": "Salut ! Comment puis-je vous aider ?"
    },
    {
        "question": "comment ça va",
        "answer": "Je vais bien, merci ! Comment puis-je vous aider aujourd'hui ?"
    },
    {
        "question": "merci",
        "answer": "De rien ! N'hésitez pas si vous avez d'autres questions."
    },
    {
        "question": "au revoir",
        "answer": "Au revoir ! Passez une excellente journée !"
    }
);

console.log('QA Pairs loaded:', window.qaPairsData.length, 'pairs');
