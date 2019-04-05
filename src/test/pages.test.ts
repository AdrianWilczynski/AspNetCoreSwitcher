import { assert } from 'chai';
import { getPagePath, getPageModelPath, isPage, isPageModel } from '../goToPage';

suite('goToPage.ts should', function () {

    test('get a page path', function () {
        const path = getPagePath('C:\\Users\\User\\Desktop\\Projects\\MyProject\\Pages\\Index.cshtml.cs');
        assert.equal(path, 'C:\\Users\\User\\Desktop\\Projects\\MyProject\\Pages\\Index.cshtml');
    });

    test('get a page model path', function () {
        const path = getPageModelPath('C:\\Users\\User\\Desktop\\Projects\\MyProject\\Pages\\Index.cshtml');
        assert.equal(path, 'C:\\Users\\User\\Desktop\\Projects\\MyProject\\Pages\\Index.cshtml.cs');
    });

    test('check if file is a page', function () {
        assert.isTrue(isPage('C:\\Users\\User\\Desktop\\Projects\\MyProject\\Pages\\Index.cshtml', '@page \n @model IndexModel'));

        assert.isFalse(isPage('C:\\Users\\User\\Desktop\\Projects\\MyProject\\Pages\\Index.cshtml', '@model MyViewModel'));
        assert.isFalse(isPage('C:\\Users\\User\\Desktop\\Projects\\MyProject\\Views\\Index.cshtml', '@page \n @model IndexModel'));
    });

    test('check if file is a page model', function () {
        assert.isTrue(isPageModel('C:\\Users\\User\\Desktop\\Projects\\MyProject\\Pages\\Index.cshtml.cs'));
        assert.isTrue(isPageModel('C:\\Users\\User\\Desktop\\Projects\\MyProject\\Pages\\Home\\Index.cshtml.cs'));

        assert.isFalse(isPageModel('C:\\Users\\User\\Desktop\\Projects\\MyProject\\Pages\\Index.cshtml'));
        assert.isFalse(isPageModel('C:\\Users\\User\\Desktop\\Projects\\MyProject\\Pages\\Index.cs'));
        assert.isFalse(isPageModel('C:\\Users\\User\\Desktop\\Projects\\MyProject\\Controllers\\Index.cshtml.cs'));
    });
});