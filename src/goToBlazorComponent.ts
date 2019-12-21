import * as vscode from 'vscode';
import * as path from 'path';
import * as fs from 'fs';
import { ext, messages } from './shared';

export async function goToCodeBehind() {
    if (!vscode.window.activeTextEditor) {
        return;
    }

    const codeBehindPath = getCodeBehindPath(vscode.window.activeTextEditor.document.fileName);

    if (!fs.existsSync(codeBehindPath)) {
        vscode.window.showWarningMessage(messages.unableToFind('code behind'));
        return;
    }

    const document = await vscode.workspace.openTextDocument(codeBehindPath);
    await vscode.window.showTextDocument(document);
}

export async function goToBlazorComponent() {
    if (!vscode.window.activeTextEditor) {
        return;
    }

    const componentPath = getBlazorComponentPath(vscode.window.activeTextEditor.document.fileName);

    if (!fs.existsSync(componentPath)) {
        vscode.window.showWarningMessage(messages.unableToFind('component'));
        return;
    }

    const document = await vscode.workspace.openTextDocument(componentPath);
    await vscode.window.showTextDocument(document);
}

function getBlazorComponentPath(codeBehindPath: string) {
    return path.join(path.dirname(codeBehindPath), path.basename(codeBehindPath, ext.razorCs) + ext.razor);
}

function getCodeBehindPath(componentPath: string) {
    return path.join(path.dirname(componentPath), path.basename(componentPath, ext.razor) + ext.razorCs);
}