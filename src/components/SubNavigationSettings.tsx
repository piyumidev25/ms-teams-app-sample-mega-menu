import { Button, Dropdown, Flex, FlexItem, Header, Text} from '@fluentui/react-northstar';
import React, { Component } from 'react';
import MainMenu from '../models/MainMenu';

export interface SubNavigationSettingsProps {

}
export interface SubNavigationSettingsState {
  mainMenu:MainMenu;
  selectedNavigationItem: string,
  successMessage:string
}
export default class SubNavigationSettings extends Component<SubNavigationSettingsProps, SubNavigationSettingsState>{

    constructor(props:any){
        super(props); 
        this.state = {
            mainMenu:this.getMainMenuFromLocalStorage(),
            selectedNavigationItem:"",
            successMessage:""
        }
      }
    render(): React.ReactNode {
        const inputItems = [];
        const {selectedNavigationItem, successMessage} = this.state;
        if(localStorage.getItem("navigationItemsList") != null){
            let existingItems:MainMenu = JSON.parse(localStorage.getItem("navigationItemsList")|| '{}');
            for(let i=0;i<existingItems.navigationItems.length;i++){
                inputItems.push(existingItems.navigationItems[i]);
            }
          }
          
        return(
            <React.Fragment>
                <Flex column gap="gap.small" vAlign="stretch">
                        <Header content={`Configure Navigation`} as="h3"/>
                </Flex>
                <FlexItem size='size.full'>
                        <Text content={`The Mega Menu can be configured here`} size={`medium`} weight={`regular`}/>
                </FlexItem>
                <FlexItem size='size.full'>
                    <Header content={`Select Navigation Item`} as="h4"/>
                </FlexItem>
                <FlexItem>
                    <Dropdown
                        items={inputItems}
                        placeholder="Select navigation item"
                        onChange = {this.setSelectedNavigationItem}
                    />
                </FlexItem>
                <br></br>
                <br></br>
                <FlexItem>
                <Flex gap="gap.large">
                    <Button content="+ Add" primary onClick={this.addSubNavigationEntry} disabled={selectedNavigationItem?false:true}/>
                </Flex>
                </FlexItem>
                {successMessage && (
                    <FlexItem>
                    <Text success content={successMessage} />
                    </FlexItem>
                )}
                <br></br>
                <br></br>
                <Flex gap="gap.small">
                    <FlexItem push>
                        <Button content="Discard"/>
                    </FlexItem>
                    <Button content="Save" primary onClick={this.saveMenuItem}/>
                </Flex>
           </React.Fragment>
        )
    }

    addSubNavigationEntry = () =>{
        let {mainMenu, selectedNavigationItem} = this.state;
        if(mainMenu){
            let subNavigationItem = mainMenu.subNavigationItems.find(x=>x.parentMenuItem === selectedNavigationItem);
           
            if(typeof subNavigationItem !== "undefined"){
                let currentSubMenuItems:string[] = typeof subNavigationItem === "undefined"? [] :subNavigationItem.childItems;
                mainMenu.subNavigationItems.find(x=>x.parentMenuItem === selectedNavigationItem)?.childItems.push(`Sub Navigation Item ${currentSubMenuItems.length+1}`);
                this.setState({mainMenu:mainMenu, successMessage:`Sub Navigation Item ${currentSubMenuItems.length+1} successfully added. Click on Save to see the change.`});
            }
            else{
                mainMenu.subNavigationItems.push({
                    parentMenuItem:selectedNavigationItem,
                    childItems:[`Sub Navigation Item 1`]
                });
                this.setState({mainMenu:mainMenu,successMessage:`Sub Navigation Item 1 successfully added. Click on Save to see the change.`});
            }
            
        }
    }
    getMainMenuFromLocalStorage = () :any =>  {
        if(localStorage.getItem("navigationItemsList") != null){
            var menu: MainMenu = JSON.parse(localStorage.getItem("navigationItemsList")|| '{}');
            return menu;
        }
        else{
            return null;
        }
    }

    saveMenuItem = () =>{
        let existingItems = this.state.mainMenu;
        localStorage.setItem("navigationItemsList", JSON.stringify(existingItems));
        window.location.reload();
    }
    setSelectedNavigationItem = (event: any, option: any)=>{
        console.log(option.value);
        this.setState({selectedNavigationItem: option.value});
    }
}