# react-native-CJKTextInput
CJKTextInput is for React Native v0.55, v0.56 only

TextInput for CJK keyboard is not work on official React Native v0.55 and v0.56, this repo provide a workaround for you.

``` tsx
    import CJKTextInput from './CJKTextInput';

    <CJKTextInput
        refCallback={(input) => { this.textInput = input; }}
        value={this.state.text}
        onChangeText={(text) => this.onChangeText(text)}
        //...
    />
```
