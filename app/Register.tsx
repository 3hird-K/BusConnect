import React, { useState } from "react";
import {
  Alert,
  StyleSheet,
  View,
  AppState,
  Text,
  ImageBackground,
} from "react-native";
import { supabase } from "../lib/supabase";
import { Button, Input } from "@rneui/themed";
import { Link, Stack } from "expo-router";
import { Image } from "@rneui/themed";

// Tells Supabase Auth to continuously refresh the session automatically if
// the app is in the foreground. When this is added, you will continue to receive
// `onAuthStateChange` events with the `TOKEN_REFRESHED` or `SIGNED_OUT` event
// if the user's session is terminated. This should only be registered once.
// AppState.addEventListener("change", (state) => {
//   if (state === "active") {
//     supabase.auth.startAutoRefresh();
//   } else {
//     supabase.auth.stopAutoRefresh();
//   }
// });

// export default function Auth() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [loading, setLoading] = useState(false);

//   async function signUpWithEmail() {
//     setLoading(true);
//     const {
//       data: { session },
//       error,
//     } = await supabase.auth.signUp({
//       email: email,
//       password: password,
//     });

//     if (error) Alert.alert(error.message);
//     if (!session)
//       Alert.alert("Please check your inbox for email verification!");
//     setLoading(false);
//   }

//   async function signInWithEmail() {
//     setLoading(true);
//     const { error } = await supabase.auth.signInWithPassword({
//       email: email,
//       password: password,
//     });

//     if (error) Alert.alert(error.message);
//     setLoading(false);
//   }

  return (
    <>
      <ImageBackground
        source={require("../assets/background.jpg")} // Local image
        style={[styles.background, styles.overlay]}
        resizeMode="stretch" // Can also use "contain", "stretch", etc.
      >
        <View style={styles.container}>
          <Image
            source={require("../assets/adaptive-icon.png")}
            style={styles.logo}
          />
          <Text style={styles.title}>Create Account</Text>

          <View style={styles.inputWrapper}>
            <Input
              placeholder=" example@gmail.com"
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
            <Input
              placeholder=" Password"
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
            href={"Register"}
            style={[styles.button]}
            disabled={loading}
            onPress={() => signUpWithEmail()}
          >
            <Text>Register</Text>
          </Link>

          <View style={[{ paddingVertical: 10, marginVertical: 5 }]}>
            <Text
              style={[styles.withoutaccount, { textDecorationLine: "none" }]}
            >
              Already have an account?{" "}
            </Text>
            <Link href={"/"} style={[styles.signIn]}>
              <Text style={{ textDecorationLine: "underline" }}>Sign-In</Text>
            </Link>
          </View>
        </View>
      </ImageBackground>
    </>
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

    shadowColor: "#fff",
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,

    elevation: 8,
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
    shadowColor: "#fff",
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,

    elevation: 8,
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
    height: 120,
    resizeMode: "contain",
    alignSelf: "center",
    marginVertical: 20,
    justifyContent: "center",
  },
  background: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    width: "100%",
    justifyContent: "center",
  },
});
