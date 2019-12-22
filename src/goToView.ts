import * as vscode from 'vscode';
import * as fs from 'fs';
import { messages } from './constants';
import { getViewPath, getClosestActionName } from './view';

export async function goToView() {
    if (!vscode.window.activeTextEditor) {
        return;
    }

    const actionName = getClosestActionName(vscode.window.activeTextEditor);
    if (!actionName) {
        vscode.window.showWarningMessage(messages.unableToFindAction);
        return;
    }

    const path = vscode.window.activeTextEditor.document.fileName;

    let viewPath = getViewPath(path, actionName);

    if (!fs.existsSync(viewPath)) {
        viewPath = getViewPath(path, actionName, true);
    }

    if (!fs.existsSync(viewPath)) {
        vscode.window.showWarningMessage(messages.unableToFind('view'));
        return;
    }

    const document = await vscode.workspace.openTextDocument(viewPath);
    await vscode.window.showTextDocument(document);
}