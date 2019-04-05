import { assert } from 'chai';
import { getViewPath } from '../view';

suite("view Should", function () {

    test("get view path", function () {
        const path = getViewPath('C:\\Users\\User\\Desktop\\Projects\\MyProject\\Controllers\\HomeController.cs',
            '   public IActionResult Index(int id)');
        assert.equal(path, 'C:\\Users\\User\\Desktop\\Projects\\MyProject\\Views\\Home\\Index.cshtml');
    });

    test("return undefined when passed line without action declaration", function () {
        const path = getViewPath('C:\\Users\\User\\Desktop\\Projects\\MyProject\\Controllers\\HomeController.cs',
            '   return View()');
        assert.equal(path, undefined);
    });
});