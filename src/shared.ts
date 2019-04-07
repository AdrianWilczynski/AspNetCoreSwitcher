import * as vscode from 'vscode';

export async function goTo(targetPath: string) {
    const document = await vscode.workspace.openTextDocument(targetPath);
    await vscode.window.showTextDocument(document);
}

export const ext = {
    cs: '.cs',
    cshtml: '.cshtml',
    cshtmlCs: '.cshtml.cs'
};

export const dirs = {
    views: 'Views',
    controllers: 'Controllers',
    pages: 'Pages',
    shared: 'Shared'
};

export const controllerSuffix = 'Controller';

export const messages = {
    notValid: (name: string) => `This file doesn't look like a ${name}.`,
    unableToFind: (name: string) => `Unable to find a matching ${name}.`,
    viewAlreadyExists: 'View already exists.',
    unableToFindAction: "Unable to find an action method declaration."
};