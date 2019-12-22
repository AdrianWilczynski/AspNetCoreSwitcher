import * as vscode from 'vscode';
import * as fs from 'fs';
import { messages } from './constants';

export async function goTo(target: string, getPath: (path: string) => string | undefined) {
    if (!vscode.window.activeTextEditor) {
        return;
    }

    const path = getPath(vscode.window.activeTextEditor.document.fileName);

    if (!path || !fs.existsSync(path)) {
        vscode.window.showWarningMessage(messages.unableToFind(target));
        return;
    }

    const document = await vscode.workspace.openTextDocument(path);
    await vscode.window.showTextDocument(document);
}