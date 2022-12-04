import { Button, Dropdown, DropdownItemProps, Flex, FlexItem, Header, ShorthandCollection, Text} from '@fluentui/react-northstar';
import React, { Component } from 'react';
import MainMenu from '../models/MainMenu';

export interface SubSubNavigationSettingsProps {

}
export interface SubSubNavigationSettingsState {
  mainMenu:MainMenu;
  selectedNavigationItem: string,
  selectedSubNavigationItem: string,
  successMessage:string
}
export default class SubSubNavigationSettings extends Component<SubSubNavigationSettingsProps, SubSubNavigationSettingsState>{

    constructor(props:any){
        super(props); 
        this.state = {
            mainMenu:this.getMainMenuFromLocalStorage(),
            selectedNavigationItem:"",
            selectedSubNavigationItem:"",
            successMessage:""
        }
      }
    render(): React.ReactNode {
        const inputItems = [];
        const inputSubMenuItems: ShorthandCollection<DropdownItemProps, Record<string, {}>> | undefined = [];
        const{selectedNavigationItem, selectedSubNavigationItem, successMessage} = this.state;

        let existingItems:MainMenu = JSON.parse(localStorage.getItem("navigationItemsList")|| '{}');
        if(localStorage.getItem("navigationItemsList") != null){
            for(let i=0;i<existingItems.navigationItems.length;i++){
                inputItems.push(existingItems.navigationItems[i]);
            }
          }
          if(selectedNavigationItem){
            let subMenuItems = existingItems.subNavigationItems.find(x=>x.parentMenuItem===selectedNavigationItem);
            if(subMenuItems?.childItems){
                for(let i=0;i<subMenuItems.childItems.length;i++){
                    inputSubMenuItems.push(subMenuItems.childItems[i]);
                }
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
                <FlexItem size='size.full'>
                    <Header content={`Select Sub Navigation Item`} as="h4"/>
                </FlexItem>
                <FlexItem>
                    <Dropdown
                        items={inputSubMenuItems}
                        placeholder="Select sub navigation item"
                        onChange = {this.setSelectedSubNavigationItem}
                    />
                </FlexItem>
                <br></br>
                <br></br>
                <FlexItem>
                <Flex gap="gap.large">
                    <Button content="+ Add" primary onClick={this.addSubSubNavigationEntry} disabled = {selectedNavigationItem && selectedSubNavigationItem?false:true}/>
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

    addSubSubNavigationEntry = () =>{
        let {mainMenu, selectedSubNavigationItem} = this.state;
        if(mainMenu){
            let subSubNavigationItem = mainMenu.subSubNavigationItems.find(x=>x.parentMenuItem === selectedSubNavigationItem);
           
            if(typeof subSubNavigationItem !== "undefined"){
                let currentSubSubMenuItems:string[] = typeof subSubNavigationItem === "undefined"? [] :subSubNavigationItem.childItems;
                mainMenu.subSubNavigationItems.find(x=>x.parentMenuItem === selectedSubNavigationItem)?.childItems.push(`Sub Sub Navigation Item ${currentSubSubMenuItems.length+1}`);
                this.setState({mainMenu:mainMenu, successMessage:`Sub Sub Navigation Item ${currentSubSubMenuItems.length+1} successfully added. Click on Save to see the change.`});
            }
            else{
                mainMenu.subSubNavigationItems.push({
                    parentMenuItem:selectedSubNavigationItem,
                    childItems:[`Sub Sub Navigation Item 1`]
                });
                this.setState({mainMenu:mainMenu, successMessage:`Sub Sub Navigation Item 1 successfully added. Click on Save to see the change.`});
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
    setSelectedSubNavigationItem = (event: any, option: any)=>{
        console.log(option.value);
        this.setState({selectedSubNavigationItem: option.value});
    }
}