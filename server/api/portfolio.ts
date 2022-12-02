export default defineEventHandler(async (event) => {
    const portfolio_items = [
        {
            id: 1,
            title: 'Elev8 Web Studio',
            link: 'https://www.elev8webstudio.com/',
            description: 'Professional WordPress website development, design, hosting and maintenance.'
        },
        {
            id: 2,
            title: 'We Build a Dream',
            link: 'https://www.webuildadream.com/',
            description: ''
        },
        {
            id: 3,
            title: 'Windsor Film Festival',
            link: 'https://windsorfilmfestival.com/',
            description: '',
        },
        {
            id: 4,
            title: 'The Hospice',
            link: 'https://www.thehospice.ca/',
            description: ''
        },
        {
            id: 5,
            title: 'Recipe Website',
            link: 'https://recipes.braedenbeaulieu.ca/',
            description: 'This is my personal recipe website!'
        },
        {
            id: 6,
            title: 'Barrels Bottles & Brews',
            link: 'https://barrelsbottlesbrews.ca/',
            description: ''
        },
        {
            id: 7,
            title: 'Downtown Windsor BIA',
            link: 'https://www.downtownwindsor.ca/',
            description: ''
        },
        {
            id: 8,
            title: 'Hockey for Hospice',
            link: 'https://www.hockeyforhospice.com/',
            description: ''
        },
        {
            id: 9,
            title: 'Windsor Symphony Orchestra',
            link: 'https://www.windsorsymphony.com/',
            description: ''
        },
        {
            id: 10,
            title: 'YQG Made',
            link: 'https://www.yqgmade.ca/',
            description: ''
        },
    ]
    
    return portfolio_items
})