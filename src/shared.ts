export const ext = {
    cs: '.cs',
    cshtml: '.cshtml',
    cshtmlCs: '.cshtml.cs',
    razor: '.razor',
    razorCs: '.razor.cs'
};

export const dirs = {
    views: 'Views',
    controllers: 'Controllers',
    pages: 'Pages',
    shared: 'Shared'
};

export const controllerSuffix = 'Controller';

export const messages = {
    unableToFind: (name: string) => `Unable to find a matching ${name}.`,
    viewAlreadyExists: 'View already exists.',
    unableToFindAction: "Unable to find an action method declaration."
};