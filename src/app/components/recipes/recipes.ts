export interface RecipesResponse {
    href: string,
    results: Recipe[],
    title: string,
    version: number
}

export interface Recipe{
    href: string,
    ingredients: string,
    thumbnail: string,
    title: string
}