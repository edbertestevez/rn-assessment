package com.rtntimer;

import android.os.Handler;
import android.os.Looper;

import android.util.Log;
import androidx.annotation.NonNull;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.Callback;
import java.util.Map;
import java.util.HashMap;
import com.rtntimer.NativeTimerSpec;

public class TimerModule extends NativeTimerSpec {
    private Handler handler = new Handler(Looper.getMainLooper());

    public static String NAME = "RTNTimer";

    TimerModule(ReactApplicationContext context) {
        super(context);
    }

    @Override
    @NonNull
    public String getName() {
        return NAME;
    }

        @ReactMethod
        public void runNativeTimer(double duration, Promise promise) {
            try {
                Log.d("TIMER_MODULE", "ANDROID native timer started");

                handler.postDelayed(new Runnable() {
                    @Override
                    public void run() {
                        Log.d("TIMER_MODULE", "ANDROID native timer ended");
                        promise.resolve("timer success");
                    }
                }, (int) duration * 1000);
            }catch(Exception e) {
                promise.reject("Timer Error", e);
            }
        }
}