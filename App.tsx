import { ScrollView, StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import * as Yup from 'yup';
import { Formik } from 'formik';
import BouncyCheckbox from 'react-native-bouncy-checkbox';

const passwordSchema = Yup.object().shape({
  passwordLength: Yup.number()
    .min(4, "Password length must be at least 4")
    .max(16, "Password length must be at most 16")
    .required("Password length is required")
});

const App = () => {
  const [password, setPassword] = useState('');
  const [isPasswordGenerated, setIsPasswordGenerated] = useState(false);
  const [lowerCase, setLowerCase] = useState(true);
  const [upperCase, setUpperCase] = useState(false);
  const [number, setNumber] = useState(false);
  const [symbol, setSymbol] = useState(false);

  const generatePasswordString = (passwordLength:number) => {
    let charactList = '';
    let lowerCaseDigit = 'abcdefghijklmnopqrstuvwxyz';
    let upperCaseDigit = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let numberDigit = '1234567890';
    let symbolList = '!@#$%^&*()_+~{}:"<>?/.,;][=|/';

    if (upperCase) charactList += upperCaseDigit;
    if (lowerCase) charactList += lowerCaseDigit;
    if (number) charactList += numberDigit;
    if (symbol) charactList += symbolList;

    const passwordResult = createPassword(charactList, passwordLength);
    setPassword(passwordResult);
    setIsPasswordGenerated(true);
  };

  const createPassword = (characters:string , passwordLength:number) => {
    let result = "";
    for (let i = 0; i < passwordLength; i++) {
      const characterIndex = Math.floor(Math.random() * characters.length);
      result += characters.charAt(characterIndex);
    }
    return result;
  };

  const resetPassword = () => {
    setPassword('');
    setIsPasswordGenerated(false);
    setLowerCase(true);
    setUpperCase(false);
    setNumber(false);
    setSymbol(false);
  };

  return (
    <ScrollView keyboardShouldPersistTaps="handled">
      <Formik
        initialValues={{ passwordLength: '' }}
        validationSchema={passwordSchema}
        onSubmit={values => {
          generatePasswordString(Number(values.passwordLength));
        }}
      >
        {({
          values,
          errors,
          touched,
          isValid,
          handleChange,
          handleSubmit,
          handleReset
        }) => (
          <View style={styles.container}>
            <View style={styles.innerWrapper}>
              <Text style={styles.innerText}>Password Length</Text>
              <TextInput
                style={styles.innerTextInput}
                onChangeText={handleChange('passwordLength')}
                placeholder="Ex. 8"
                keyboardType='numeric'
              />
            </View>
            {touched.passwordLength && errors.passwordLength && (
              <Text style={styles.errorText}>{errors.passwordLength}</Text>
            )}

            <View style={styles.innerWrapper}>
              <Text style={styles.innerText}>Include LowerCase</Text>
              <BouncyCheckbox
                isChecked={lowerCase}
                onPress={() => { setLowerCase(!lowerCase) }}
                fillColor='red'
              />
            </View>

            <View style={styles.innerWrapper}>
              <Text style={styles.innerText}>Include UpperCase</Text>
              <BouncyCheckbox
                isChecked={upperCase}
                onPress={() => { setUpperCase(!upperCase) }}
                fillColor='green'
              />
            </View>

            <View style={styles.innerWrapper}>
              <Text style={styles.innerText}>Include Numbers</Text>
              <BouncyCheckbox
                isChecked={number}
                onPress={() => { setNumber(!number) }}
                fillColor='orange'
              />
            </View>

            <View style={styles.innerWrapper}>
              <Text style={styles.innerText}>Include Symbols</Text>
              <BouncyCheckbox
                isChecked={symbol}
                onPress={() => { setSymbol(!symbol) }}
                fillColor='blue'
              />
            </View>

            <TouchableOpacity
              style={styles.prybtn}
              disabled={!isValid}
              onPress={()=>handleSubmit()}
            >
              <Text style={styles.btnText}>Generate Password</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.secbtn}
              onPress={resetPassword}
            >
              <Text style={styles.btnText}>Reset</Text>
            </TouchableOpacity>
          </View>
        )}
      </Formik>

      {isPasswordGenerated ? (
        <View style={styles.resultContainer}>
          <Text style={styles.resultText}>Result:</Text>
          <Text style={styles.description}>Hold and press it long to copy the text</Text>
          <Text selectable={true} style={styles.generatedPassword}>{password}</Text>
        </View>
      ) : null}
    </ScrollView>
  );
}

export default App;

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  innerWrapper: {
    marginBottom: 20,
  },
  innerText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  innerTextInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
  },
  errorText: {
    color: 'red',
    fontSize: 14,
  },
  prybtn: {
    backgroundColor: '#007BFF',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 10,
  },
  secbtn: {
    backgroundColor: '#6c757d',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  btnText: {
    color: '#fff',
    fontSize: 16,
  },
  resultContainer: {
    marginTop: 20,
  },
  resultText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 14,
    color: '#555',
    marginBottom: 10,
  },
  generatedPassword: {
    fontSize: 20,
    color: '#000',
  },
});
