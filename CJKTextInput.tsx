import React from 'react';
import {
    TextInput,
    TextInputProps,
    Platform,
} from 'react-native';

interface IProps extends TextInputProps {
    refCallback?: (input: TextInput) => void;
}
interface IState {
    value: string;
}

/**
 * Important:
 * Remove this module after upgrade to v0.57
 * 
 * v0.57 ChangeLogs:
 * https://github.com/react-native-community/react-native-releases/blob/master/CHANGELOG.md#ios-specific-fixes
 * 
 * Issue commit:
 * https://github.com/facebook/react-native/commit/892212b#diff-a5239f085f0beab82ba2c1643be157ac
 */
export default class CJKTextInput extends React.Component<IProps, IState> {
    static defaultProps = {
        refCallback: (input: TextInput) => { return; },
    };

    constructor(props: IProps) {
        super(props);

        this.state = {
            value: props.value,
        };
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
    componentWillReceiveProps(nextProps: TextInputProps) {
        if (Platform.OS === 'ios') {
            if (!nextProps.value && this.props.value) {
                this.setState({
                    value: this.props.value
                });
                setTimeout(() => {
                    this.setState({
                        value: ''
                    });
                }, 0);
            } else {
                this.setState({
                    value: nextProps.value
                });
            }
        }
    }

    shouldComponentUpdate(nextProps: TextInputProps, nextState: IState) {
        let shouldUpdate: boolean = true;

        if (Platform.OS === 'ios') {
            if ((this.state.value !== nextState.value) && nextState.value) {
                shouldUpdate = false;
            } else if (!this.state.value && !nextState.value) {
                shouldUpdate = false;
            }

            console.log('CJKTextInput - shouldComponentUpdate',
                'this.state.value', this.state.value,
                'nextState.value', nextState.value,
                'shouldComponentUpdate', shouldUpdate
            );
        }

        return shouldUpdate;
    }

    render() {
        console.log('CJKTextInput - render',
            'this.props.value', this.props.value,
            'this.state.value', this.state.value
        );
        const extProps = Platform.OS === 'ios' ? { value: this.state.value } : null;

        return <TextInput
            {...this.props}
            {...extProps}
            ref={this.props.refCallback}
        />;
    }
}
