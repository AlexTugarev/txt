// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';


function newTask(step: number): (progress: vscode.Progress<{ message?: string; increment?: number }>, token: vscode.CancellationToken) => Thenable<string> {
    return async (progress, token) => {
        let count = 100;
        await new Promise(resolve => {
            let intervalId = setInterval(() => {
                if (count >= 1 && !token.isCancellationRequested) {
                    progress.report({
                        increment: step,
                        message: `${Math.round(count)} task(s) left`
                    });
                    count = count - step;
                    return;
                }
                clearInterval(intervalId);
                resolve(undefined);
            }, 100);
        });
        return "Foo!";
    };
}

export function activate(context: vscode.ExtensionContext) {
	console.log('"TXT" is now active!');

    const disposables = [];
	disposables.push(...[
        vscode.commands.registerCommand('extension.helloWorld', async () => {
            vscode.window.withProgress({ title: "Progressive aggressor 1", location: vscode.ProgressLocation.Notification, cancellable: true }, newTask(0.6));
            vscode.window.withProgress({ title: "Progressive aggressor 2", location: vscode.ProgressLocation.Notification, cancellable: true }, newTask(1));
            vscode.window.withProgress({ title: "Progressive aggressor 3", location: vscode.ProgressLocation.Notification, cancellable: true }, newTask(0.3));
            vscode.window.showWarningMessage(`Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia commodi ea quidem quaerat, porro rem laboriosam expedita doloribus natus similique consectetur harum mollitia aliquam libero, exercitationem praesentium deserunt culpa animi?

            New Line here.
            New Line here.
            New Line here.


            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia commodi ea quidem quaerat, porro rem laboriosam expedita doloribus natus similique consectetur harum mollitia aliquam libero, exercitationem praesentium deserunt culpa animi?

            New Line here.
            New Line here.
            New Line here.


            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia commodi ea quidem quaerat, porro rem laboriosam expedita doloribus natus similique consectetur harum mollitia aliquam libero, exercitationem praesentium deserunt culpa animi?

            New Line here.
            New Line here.
            New Line here.


            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia commodi ea quidem quaerat, porro rem laboriosam expedita doloribus natus similique consectetur harum mollitia aliquam libero, exercitationem praesentium deserunt culpa animi?
            `, "OK?!");
            vscode.window.showInformationMessage(`Loooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooong text. 
            Loooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooong text.`);
            vscode.window.showInformationMessage('Lorem (short version)');
            vscode.window.showInformationMessage('Link to [gitpod.io](https://gitpod.io)! 🚀');
            const result = await vscode.window.showInformationMessage('Hello World!', "Warning", "Error");
            if (result === "Warning") {
                vscode.window.withProgress({ title: "Progressive aggressor 4", location: vscode.ProgressLocation.Notification, cancellable: true }, newTask(1));
                vscode.window.showWarningMessage('Hello Warning!');
            } else {
                vscode.window.showErrorMessage('Hello Error');
            }
            vscode.window.withProgress({ title: "Progressive aggressor 5", location: vscode.ProgressLocation.Notification, cancellable: true }, newTask(1));
        }),
        vscode.commands.registerCommand('extension.info', () => {
            vscode.window.showInformationMessage('Info the world!');
        }),
        vscode.commands.registerCommand('extension.warning', () => {
            vscode.window.showWarningMessage('Warn the world!');
        }),
        vscode.commands.registerCommand('extension.error', () => {
            vscode.window.showErrorMessage('Fail the world!');
        }),
        vscode.commands.registerCommand('extension.progress', () => {
            vscode.window.withProgress({ title: "Progressive aggressor!", location: vscode.ProgressLocation.Notification, cancellable: true }, newTask(0.1));
            vscode.window.withProgress({ title: "Progressive aggressor!", location: vscode.ProgressLocation.SourceControl, cancellable: true }, newTask(0.1));
            vscode.window.withProgress({ title: "Progressive aggressor!", location: vscode.ProgressLocation.Window, cancellable: true }, newTask(0.1));
        })
    ]);

	context.subscriptions.push(...disposables);
}

// this method is called when your extension is deactivated
export function deactivate() {}
