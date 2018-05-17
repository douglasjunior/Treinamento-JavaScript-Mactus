package com.projetoreactnavigation;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

public class CalculadorModule extends ReactContextBaseJavaModule {


    public CalculadorModule(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    public String getName() {
        return "Calculador";
    }

    @ReactMethod
    public void somar(Float numA, Float numB, Promise promise) {

        if (numA == 0 || numB == 0) {
            promise.reject("100", "Número não pode ser nulo.");
            return;
        }

        float resultado = numA + numB;

        promise.resolve(resultado);

    }

}
