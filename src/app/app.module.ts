import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';

import {ApolloClient, createNetworkInterface} from 'apollo-client';
import {ApolloModule} from 'apollo-angular';


import {AppComponent} from './app.component';
import {ChemblModule} from "./chembl/chembl.module";
import {ShareModule} from "./share/share.module";

const client = new ApolloClient({
  networkInterface: createNetworkInterface({
    uri: "http://127.0.0.1:8000/graphql/"
  })
})
export function provideClient(): ApolloClient {
  return client;
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    ApolloModule.forRoot(provideClient),
    ChemblModule,
    ShareModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
