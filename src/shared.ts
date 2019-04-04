import * as vscode from 'vscode';

export async function goTo(path: string) {
    const document = await vscode.workspace.openTextDocument(path);
    await vscode.window.showTextDocument(document);
}

export const ext = {
    cs: '.cs',
    cshtml: '.cshtml'
};

export const dirs = {
    views: 'Views',
    controllers: 'Controllers'
};

export const controllerSuffix = 'Controller';