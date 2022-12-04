import React, { Component } from 'react';
import './App.css';
import { Menu, MenuProps, Provider, teamsTheme  } from '@fluentui/react-northstar'
import Settings from './components/Settings';
import MainMenu from './models/MainMenu';
import CommanMenuContent from './components/CommanMenuContent';

export interface AppProps {

}
export interface AppState {
  showSettings: boolean;
  showCommonMenuContent:boolean;
}
export default class App extends Component<AppProps, AppState>{
  constructor(props:any){
    super(props);
    this.state = {
      showSettings:true,
      showCommonMenuContent:false
    }
  }
  render(){
    let items: MenuProps['items'] = []
    if(localStorage.getItem("navigationItemsList") != null){
      items.push({
        key:'Settings',
        content:'Settings',
        onClick:()=>this.showSettingsView()
      });
      let existingItems:MainMenu = JSON.parse(localStorage.getItem("navigationItemsList")|| '{}');
      for(let i=0;i<existingItems.navigationItems.length;i++){
        let navigationItem = existingItems.navigationItems[i];
        let subMenuItems = existingItems.subNavigationItems.find(x=>x.parentMenuItem === navigationItem)?.childItems;
        if(typeof subMenuItems !== "undefined" && subMenuItems.length>0){
          items.push({
            key:existingItems.navigationItems[i],
            content:existingItems.navigationItems[i],
            onClick:()=>this.loadNavigationItemContent(i),
            on: 'hover',
            menu:{
              items: this.getSubMenuItems(i)
            },
            
          });
        }
        else{
          items.push({
            key:existingItems.navigationItems[i],
            content:existingItems.navigationItems[i],
            onClick:()=>this.loadNavigationItemContent(i)
          });
        }
        
      }
    }
    const {showSettings, showCommonMenuContent} = this.state;
    return (
      
      <Provider theme={teamsTheme}>
        <Menu defaultActiveIndex={0} items={items} underlined primary />
        {showSettings && (
          <Settings></Settings>
        )}
        {showCommonMenuContent &&(
          <CommanMenuContent></CommanMenuContent>
        )
        }
        </Provider>
    )
  }

  showSettingsView = () =>{
    console.log("clicked");
    this.setState({showSettings:true, showCommonMenuContent:false});
  }
  loadNavigationItemContent = (itemIndex:number) =>{
    let existingItems:MainMenu = JSON.parse(localStorage.getItem("navigationItemsList")|| '{}');
    let selectedMenuItem = existingItems.navigationItems[itemIndex];
    if(existingItems.subNavigationItems.filter(x=>x.parentMenuItem === selectedMenuItem).length === 0){
      this.setState({showCommonMenuContent:true, showSettings:false});
    }
  }
  
  getSubMenuItems = (item:number):any =>{
    let subItems = [];
    let existingItems:MainMenu = JSON.parse(localStorage.getItem("navigationItemsList")|| '{}');
    let navigationItem = existingItems.navigationItems[item];
    let subMenuItems = existingItems.subNavigationItems.find(x=>x.parentMenuItem === navigationItem)?.childItems;
    
    if(typeof subMenuItems !== "undefined"){
      for(let i =0; i <subMenuItems.length ; i++ ){
        let submenuItem:string = subMenuItems[i];
        let subsubMenuItem = existingItems.subSubNavigationItems.find(x=>x.parentMenuItem === submenuItem)?.childItems;
        if(typeof subsubMenuItem !=="undefined"){
          subItems.push({
            key: submenuItem,
            content:submenuItem,
            onClick:()=>this.loadSubNavigationItemContent(i),
            on:'hover',
            menu:{
              items: this.getSubSubMenuItems(submenuItem)
            },
          })
        }
        else{
          subItems.push({
            key: submenuItem,
            content:submenuItem,
            onClick:()=>this.loadSubNavigationItemContent(i),
            on:'hover'
          })
        }
      }
      return subItems;
    }
  }

  getSubSubMenuItems = (item:string):any =>{
    let subSubItems = [];
    let existingItems:MainMenu = JSON.parse(localStorage.getItem("navigationItemsList")|| '{}');
    let subsubMenuItems = existingItems.subSubNavigationItems.find(x=>x.parentMenuItem === item)?.childItems;
    
    if(typeof subsubMenuItems !== "undefined"){
      for(let i =0; i <subsubMenuItems.length ; i++ ){
        let subSubmenuItem:string = subsubMenuItems[i];
        subSubItems.push({
          key: subSubmenuItem,
          content:subSubmenuItem,
          onClick:()=>this.loadSubSubNavigationItemContent(i)
        })
      }
      return subSubItems;
    }
  }

  loadSubNavigationItemContent = (itemIndex:number) =>{
    let existingItems:MainMenu = JSON.parse(localStorage.getItem("navigationItemsList")|| '{}');
    let selectedMenuItem = existingItems.subNavigationItems[itemIndex];
    if(existingItems.subSubNavigationItems.filter(x=>x.parentMenuItem === selectedMenuItem.parentMenuItem).length === 0){
      this.setState({showCommonMenuContent:true, showSettings:false});
    }
  }

  loadSubSubNavigationItemContent = (itemIndex:number) =>{
    this.setState({showCommonMenuContent:true, showSettings:false});
  }
}
