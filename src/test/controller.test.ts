import { assert } from 'chai';
import { getControllerPath, isView } from '../goToController';

suite('goToController.ts should', function () {

    test('get a controller path', function () {
        const path = getControllerPath('C:\\Users\\User\\Desktop\\Projects\\MyProject\\Views\\Home\\Index.cshtml');
        assert.equal(path, 'C:\\Users\\User\\Desktop\\Projects\\MyProject\\Controllers\\HomeController.cs');
    });

    test('recognize a valid view path', function () {
        assert.isTrue(isView('C:\\Users\\User\\Desktop\\Projects\\MyProject\\Views\\Home\\Index.cshtml'));
    });

    test('recognize an invalid view path', function () {
        assert.isFalse(isView('C:\\Users\\User\\Desktop\\Projects\\MyProject\\Views\\_Layout.cshtml'));
        assert.isFalse(isView('C:\\Users\\User\\Desktop\\Projects\\MyProject\\Templates\\Home\\Index.cshtml'));
        assert.isFalse(isView('C:\\Users\\User\\Desktop\\Projects\\MyProject\\Templates\\Home\\Home\\Index.cshtml'));
        assert.isFalse(isView('C:\\Users\\User\\Desktop\\Projects\\MyProject\\Controllers\\HomeController.cs'));
        assert.isFalse(isView('C:\\Users\\User\\Desktop\\Projects\\MyProject\\Pages\\Index.cshtml'));
    });
});