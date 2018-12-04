"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var react_1 = require("react");
var react_native_1 = require("react-native");
/**
 * TODO:
 * Remove this module after upgrade to v0.57
 *
 * v0.57 ChangeLogs:
 * https://github.com/react-native-community/react-native-releases/blob/master/CHANGELOG.md#ios-specific-fixes
 *
 * Issue commit:
 * https://github.com/facebook/react-native/commit/892212b#diff-a5239f085f0beab82ba2c1643be157ac
 */
var CJKTextInput = (function (_super) {
    __extends(CJKTextInput, _super);
    function CJKTextInput(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            value: props.value
        };
        return _this;
    }
    /**
     *
     * for english keyboard:
     *
     * Input value | Should update
     * ------------|---------
     * ''          |
     * 'H'         | NO
     * 'He'        | NO
     * 'Hel'       | NO
     * 'Hell'      | NO
     * 'Hello'     | NO
     * ''          | YES
     *
     *
     * for chinese keyboard:
     *
     * Input value | Should update
     * ------------|---------
     * ''          |
     * 'n'         | NO
     * 'ni'        | NO
     * 'nih'       | NO
     * 'niha'      | NO
     * 'nihao'     | NO
     * '你好'       | NO
     * '你好'       | YES
     * ''          | YES
     *
     *
     * @param nextProps
     */
    CJKTextInput.prototype.componentWillReceiveProps = function (nextProps) {
        var _this = this;
        if (react_native_1.Platform.OS === 'ios') {
            if (!nextProps.value && this.props.value) {
                this.setState({
                    value: this.props.value
                });
                setTimeout(function () {
                    _this.setState({
                        value: ''
                    });
                }, 0);
            }
            else {
                this.setState({
                    value: nextProps.value
                });
            }
        }
    };
    CJKTextInput.prototype.shouldComponentUpdate = function (nextProps, nextState) {
        var shouldUpdate = true;
        if (react_native_1.Platform.OS === 'ios') {
            if ((this.state.value !== nextState.value) && nextState.value) {
                shouldUpdate = false;
            }
            else if (!this.state.value && !nextState.value) {
                shouldUpdate = false;
            }
            console.log('CJKTextInput - shouldComponentUpdate', 'this.state.value', this.state.value, 'nextState.value', nextState.value, 'shouldComponentUpdate', shouldUpdate);
        }
        return shouldUpdate;
    };
    CJKTextInput.prototype.render = function () {
        console.log('CJKTextInput - render', 'this.props.value', this.props.value, 'this.state.value', this.state.value);
        var extProps = react_native_1.Platform.OS === 'ios' ? { value: this.state.value } : null;
        return <react_native_1.TextInput {...this.props} {...extProps} ref={this.props.refCallback}/>;
    };
    CJKTextInput.defaultProps = {
        refCallback: function (input) { return; }
    };
    return CJKTextInput;
}(react_1["default"].Component));
exports["default"] = CJKTextInput;
