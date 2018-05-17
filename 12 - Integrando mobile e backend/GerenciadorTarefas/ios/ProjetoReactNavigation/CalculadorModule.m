//
//  CalculadorModule.m
//  ProjetoReactNavigation
//
//  Created by Douglas Nassif Roma Junior on 16/05/18.
//  Copyright © 2018 Facebook. All rights reserved.
//

#import "CalculadorModule.h"
#import <React/RCTConvert.h>

@implementation CalculadorModule

RCT_EXPORT_MODULE(Calculador);

RCT_EXPORT_METHOD(somar:(double )numA numB:(double )numB promise:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)
{
  
  if (numA == 0 || numB == 0) {
    reject(@"100", @"Número não pode ser nulo.", nil);
    return;
  }
  
  double resultado = numA + numB;
  
  resolve([NSNumber numberWithDouble:resultado]);
}

@end
