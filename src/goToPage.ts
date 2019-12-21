import * as vscode from 'vscode';
import * as path from 'path';
import * as fs from 'fs';
import { dirs, ext, messages } from './shared';

export async function goToPage() {
    if (!vscode.window.activeTextEditor) {
        return;
    }

    const pagePath = getPagePath(vscode.window.activeTextEditor.document.fileName);

    if (!fs.existsSync(pagePath)) {
        vscode.window.showWarningMessage(messages.unableToFind('page'));
        return;
    }

    const document = await vscode.workspace.openTextDocument(pagePath);
    await vscode.window.showTextDocument(document);
}

export async function goToPageModel() {
    if (!vscode.window.activeTextEditor) {
        return;
    }

    const pageModelPath = getPageModelPath(vscode.window.activeTextEditor.document.fileName);

    if (!fs.existsSync(pageModelPath)) {
        vscode.window.showWarningMessage(messages.unableToFind('page model'));
        return;
    }

    const document = await vscode.workspace.openTextDocument(pageModelPath);
    await vscode.window.showTextDocument(document);
}

export function getPagePath(pageModelPath: string) {
    return path.join(path.dirname(pageModelPath), path.basename(pageModelPath, ext.cshtmlCs) + ext.cshtml);
}

export function getPageModelPath(pagePath: string) {
    return path.join(path.dirname(pagePath), path.basename(pagePath, ext.cshtml) + ext.cshtmlCs);
}

export function isPageModel(pageModelPath: string) {
    return pageModelPath.endsWith(ext.cshtmlCs) && isLocatedInPagesDir(pageModelPath);
}

export function isPage(pagePath: string) {
    return pagePath.endsWith(ext.cshtml) && isLocatedInPagesDir(pagePath);
}

function isLocatedInPagesDir(pagePath: string) {
    return pagePath.split(path.sep).includes(dirs.pages);
}