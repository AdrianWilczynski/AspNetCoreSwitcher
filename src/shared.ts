import * as vscode from 'vscode';

export function getCurrentLine(editor: vscode.TextEditor) {
    return editor.document.lineAt(editor.selection.start.line).text;
}

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
    unableToCreateView: 'Unable to create a view.',
    viewAlreadyExists: 'View already exists.',
    notMethodDeclaration: "This line doesn't look like an action method declaration."
};