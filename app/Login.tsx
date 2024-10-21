import React, { useState } from "react";
import { Alert, StyleSheet, View, AppState, Text } from "react-native";
import { supabase } from "../lib/supabase";
import { Button, Input } from "@rneui/themed";
import { Link } from "expo-router";
import { Image } from "@rneui/themed";

// Tells Supabase Auth to continuously refresh the session automatically if
// the app is in the foreground. When this is added, you will continue to receive
// `onAuthStateChange` events with the `TOKEN_REFRESHED` or `SIGNED_OUT` event
// if the user's session is terminated. This should only be registered once.
AppState.addEventListener("change", (state) => {
  if (state === "active") {
    supabase.auth.startAutoRefresh();
  } else {
    supabase.auth.stopAutoRefresh();
  }
});

export default function Auth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function signInWithEmail() {
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) Alert.alert(error.message);
    setLoading(false);
  }

  async function signUpWithEmail() {
    setLoading(true);
    const {
      data: { session },
      error,
    } = await supabase.auth.signUp({
      email: email,
      password: password,
    });

    if (error) Alert.alert(error.message);
    if (!session)
      Alert.alert("Please check your inbox for email verification!");
    setLoading(false);
  }

  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/adaptive-icon.png")}
        style={styles.logo}
      />
      <Text style={styles.title}>Login Account</Text>

      <View style={styles.inputWrapper}>
        {/* <Text style={[styles.label]}>Email :</Text> */}
        <Input
          placeholder=" example@gmail.com"
          labelStyle={styles.label}
          inputContainerStyle={styles.inputContainer}
          inputStyle={styles.input}
          leftIcon={{
            type: "font-awesome",
            name: "user",
            color: "dodgerblue",
          }}
          onChangeText={(text) => setEmail(text)}
          value={email}
          autoCapitalize={"none"}
        />
        {/* <Text style={[styles.label]}>Password :</Text> */}
        <Input
          placeholder=" password"
          labelStyle={styles.label}
          inputContainerStyle={styles.inputContainer}
          inputStyle={styles.input}
          leftIcon={{
            type: "font-awesome",
            name: "lock",
            color: "dodgerblue",
          }}
          onChangeText={(text) => setPassword(text)}
          value={password}
          secureTextEntry={true}
          autoCapitalize={"none"}
        />
      </View>
      <Link
        href={""}
        style={[styles.button]}
        disabled={loading}
        onPress={() => signInWithEmail()}
      >
        <Text>Sign-In</Text>
      </Link>
      <View style={[{ paddingVertical: 10, marginVertical: 5 }]}>
        <Text style={[styles.withoutaccount, { textDecorationLine: "none" }]}>
          Without an account?{" "}
        </Text>
        <Link href={"/Sign-Up"} style={[styles.signIn]}>
          <Text style={{ textDecorationLine: "underline" }}>Sign Up</Text>
        </Link>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // backgroundColor: "#000",
  },
  verticallySpaced: {
    paddingTop: 4,
    paddingBottom: 4,
    alignSelf: "stretch",
  },
  mt20: {
    marginTop: 20,
  },
  button: {
    paddingVertical: 15,
    textTransform: "uppercase",
    backgroundColor: "dodgerblue",
    borderRadius: 50,
    textAlign: "center",
    color: "#fff",
    fontWeight: "900",
    marginHorizontal: 13,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,

    elevation: 10,
  },
  signIn: {
    color: "dodgerblue",
    textAlign: "center",
    fontSize: 13,
    fontWeight: "800",
    textTransform: "uppercase",
    textShadowColor: "#000", // Shadow color
    textShadowOffset: { width: 2, height: 2 }, // Offset as an object
    textShadowRadius: 3,
  },
  withoutaccount: {
    color: "dimgray",
    textDecorationLine: "none",
    textAlign: "center",
    textShadowColor: "#000", // Shadow color
    textShadowOffset: { width: 2, height: 2 }, // Offset as an object
    textShadowRadius: 3,
  },

  inputWrapper: {
    // padding: 20,
    // backgroundColor: "#f9f9f9",
    // borderRadius: 10,
    // shadowColor: "#000",
    // shadowOffset: {
    //   width: 0,
    //   height: 1,
    // },
    // shadowOpacity: 0.18,
    // shadowRadius: 1.0,

    // elevation: -6,
    marginBottom: 10,
  },
  label: {
    color: "#000",
    fontWeight: "600",
    fontSize: 16,
    textAlign: "left",
    marginLeft: 25,
    marginBottom: 5,
  },
  inputContainer: {
    borderBottomWidth: 0,
    backgroundColor: "#fff", // White background inside the input
    borderRadius: 50,
    paddingHorizontal: 22, // Rounded corners inside the input
    // paddingHorizontal: 2, // Padding inside the input
  },
  input: {
    fontSize: 16,
    paddingHorizontal: 5, // Font size for the input text
  },
  title: {
    fontSize: 28,
    fontWeight: "900",
    textAlign: "center",
    paddingVertical: 20,
    textTransform: "uppercase",
    // color: "midnightblue",
    color: "#fff",
    textShadowColor: "#000", // Shadow color
    textShadowOffset: { width: 2, height: 2 }, // Offset as an object
    textShadowRadius: 3,
    marginBottom: 15,
  },
  logo: {
    width: 340, // Adjust the size of the image
    height: 150,
    resizeMode: "contain",
    alignSelf: "center",
    marginVertical: 20,
    justifyContent: "center",
  },
});
