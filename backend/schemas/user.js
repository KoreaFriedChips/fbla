export default {
    name: 'user',
    title: 'User',
    type: 'document',
    fields: [
        {
            name: 'userName',
            title: 'UserName',
            type: 'string',
        },
        {
            name: 'image',
            title: 'Image',
            type: 'string',
        },
        {
            name: 'admin',
            title: 'Admin',
            type: 'boolean',
            initialValue: false
        },
        {
            name: 'points',
            title: 'Points',
            type: 'number',
            initialValue: 0
        },
        {
            name: 'grade',
            title: 'Grade',
            type: 'number',
            initialValue: 0
        }
    ]
}