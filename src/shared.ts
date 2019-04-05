import * as vscode from 'vscode';
import * as fs from 'fs';

export function getCurrentLine(editor: vscode.TextEditor) {
    return editor.document.lineAt(editor.selection.start.line).text;
}

export async function goTo(targetPath: string | undefined, errorMessage: string) {
    if (!targetPath || !fs.existsSync(targetPath)) {
        vscode.window.showErrorMessage(errorMessage);
        return;
    }

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
    pages: 'Pages'
};

export const controllerSuffix = 'Controller';