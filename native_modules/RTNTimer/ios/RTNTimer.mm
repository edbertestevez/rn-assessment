#import "RTNTimerSpec.h"
#import "RTNTimer.h"

@implementation RTNTimer

RCT_EXPORT_MODULE()

- (void)runNativeTimer:(double)duration resolve:(RCTPromiseResolveBlock)resolve reject:(RCTPromiseRejectBlock)reject {
    @try {
        NSLog(@"IOS Native Timer started");

        dispatch_after(dispatch_time(DISPATCH_TIME_NOW, (int64_t)(duration * NSEC_PER_SEC)), dispatch_get_main_queue(), ^{
            NSLog(@"IOS Native Timer ended");
            
            // Creating an NSString with the text result
            NSString *resultText = [NSString stringWithFormat:@"timer success", duration];
            
            // Resolving the promise with the text result
            resolve(resultText);
        });
    } @catch (NSException *exception) {
        reject(@"Timer Error", @"An error occurred while running the timer", nil);
    }
}

- (std::shared_ptr<facebook::react::TurboModule>)getTurboModule:
    (const facebook::react::ObjCTurboModule::InitParams &)params
{
    return std::make_shared<facebook::react::NativeTimerSpecJSI>(params);
}

@end
