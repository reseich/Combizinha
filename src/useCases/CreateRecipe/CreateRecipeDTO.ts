export interface ICreateRecipeDTO {
    name: string;
    prepareTime: string;
    portions: string;
    category: string;
    ingredients: [string];
    steps: [string];
    createdAt: number
}