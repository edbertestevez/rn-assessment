#import "RTNTimerSpec.h"
#import "RTNTimer.h"

@implementation RTNTimer

RCT_EXPORT_MODULE()

RCT_EXPORT_METHOD(startTimer:(NSInteger)duration resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject)
{
    dispatch_after(dispatch_time(DISPATCH_TIME_NOW, (int64_t)(duration * NSEC_PER_SEC)), dispatch_get_main_queue(), ^{
        resolve(@"Timer completed!");
    });
}

- (std::shared_ptr<facebook::react::TurboModule>)getTurboModule:
    (const facebook::react::ObjCTurboModule::InitParams &)params
{
    return std::make_shared<facebook::react::NativeTimerSpecJSI>(params);
}

@end