export default defineEventHandler(async (event) => {
    const config = useRuntimeConfig()

    const portfolio_items = [
        {
            id: 1,
            title: 'Recipe Website',
            link: 'https://recipes.braedenbeaulieu.ca/',
            description: 'This is my personal recipe website!'
        },
        {
            id: 2,
            title: 'Elev8 Web Studio',
            link: 'https://www.elev8webstudio.com/',
            description: 'Professional WordPress website development, design, hosting and maintenance.'
        },
        {
            id: 3,
            title: 'Recipe Website',
            link: 'https://recipes.braedenbeaulieu.ca/',
            description: 'This is my personal recipe website!',
        },
        {
            id: 4,
            title: 'Elev8 Web Studio',
            link: 'https://www.elev8webstudio.com/',
            description: 'Professional WordPress website development, design, hosting and maintenance.'
        },
        {
            id: 5,
            title: 'Recipe Website',
            link: 'https://recipes.braedenbeaulieu.ca/',
            description: 'This is my personal recipe website!'
        },
        {
            id: 6,
            title: 'Elev8 Web Studio',
            link: 'https://www.elev8webstudio.com/',
            description: 'Professional WordPress website development, design, hosting and maintenance.'
        },
        {
            id: 7,
            title: 'Recipe Website',
            link: 'https://recipes.braedenbeaulieu.ca/',
            description: 'This is my personal recipe website!'
        },
    ]
    
    return portfolio_items
})