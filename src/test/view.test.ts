import { assert } from 'chai';
import { getViewPath, isController, getActionName } from '../view';

suite('view.ts should', function () {

    test('get a view path', function () {
        const path = getViewPath('C:\\Users\\User\\Desktop\\Projects\\MyProject\\Controllers\\HomeController.cs', 'Index');
        assert.equal(path, 'C:\\Users\\User\\Desktop\\Projects\\MyProject\\Views\\Home\\Index.cshtml');
    });

    test('get a path of a view inside the Shared directory', function () {
        const path = getViewPath('C:\\Users\\User\\Desktop\\Projects\\MyProject\\Controllers\\HomeController.cs', 'Error', true);
        assert.equal(path, 'C:\\Users\\User\\Desktop\\Projects\\MyProject\\Views\\Shared\\Error.cshtml');
    });

    test('get a view path for controllers nested inside an area folder', function () {
        const path = getViewPath('C:\\Users\\User\\Desktop\\Projects\\MyProject\\Areas\\MyArea\\Controllers\\HomeController.cs', 'Index');
        assert.equal(path, 'C:\\Users\\User\\Desktop\\Projects\\MyProject\\Areas\\MyArea\\Views\\Home\\Index.cshtml');
    });

    test('recognize a valid controller path', function () {
        assert.isTrue(isController('C:\\Users\\User\\Desktop\\Projects\\MyProject\\Areas\\MyArea\\Controllers\\HomeController.cs'));
        assert.isTrue(isController('C:\\Users\\User\\Desktop\\Projects\\MyProject\\Controllers\\ItemController.cs'));
    });

    test('recognize an invalid controller path', function () {
        assert.isFalse(isController('C:\\Users\\User\\Desktop\\Projects\\MyProject\\Areas\\MyArea\\Views\\HomeController.cs'));
        assert.isFalse(isController('C:\\Users\\User\\Desktop\\Projects\\MyProject\\Pages\\Item.cs'));
    });

    test('parse an action method declaration', function () {
        assert.equal('Index', getActionName('   public IActionResult Index(int id)'));
        assert.equal('Index', getActionName('   public Task<IActionResult> Index(ItemDto item)'));
        assert.equal('Update', getActionName('public Task<System.Web.Mvc.ViewResultBase.ViewResult> Update(ItemDto item)'));
    });

    test('return undefined when passed unparsable line', function () {
        assert.isUndefined(getActionName('   return View()'));
        assert.isUndefined(getActionName('   public string  Update()'));
        assert.isUndefined(getActionName('var number = 66'));
    });
});