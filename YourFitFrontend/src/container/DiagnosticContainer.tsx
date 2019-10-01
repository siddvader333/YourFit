import React, { Component } from 'react';
import DiagnosticOption from '../components/DiagnosticOption';
import Navbar from '../components/Navbar';
import history from '../history';
import DiagnosticContinueButton from '../components/DiagnosticContinueButton';
import DiagnosticStepType from '../util/Types';
import DiagnosticSteps from '../util/DiagnosticStepValues';

/*
 * DiagnosticContainerState maintains the state of the login page
 * It maintains the following: 
 * diagnosticStep - String (DiadnosticStep) represents where in workflow user is 
 * percentageComplete - Number (Represents how far along user is in workflow to be displayed)
 * 
 */

type DiagnosticContainerState = {
	diagnosticStep: DiagnosticStepType;
    displayItems: Array<any>| undefined;
};


export default class DiagnosticContainer extends Component<{}, DiagnosticContainerState> {
	constructor(props: any) {
		super(props);
		this.state = {
			diagnosticStep: DiagnosticSteps[0],
            displayItems: DiagnosticSteps[0].displayItems
        };
        this.handleItemClick = this.handleItemClick.bind(this);
        this.calculateNextStep = this.calculateNextStep.bind(this);
    }
    
    async IsAuth(): Promise<boolean>{
        const loggedIn = await fetch('/auth');
        const json = await loggedIn.json();
        if(json.loggedIn){
            return true;
        }else {
            return false;
        }
    }

    async calculateNextStep(target: any): Promise<void>{ 
        if (target) return;
        const currIndex = DiagnosticSteps.indexOf(this.state.diagnosticStep);
        const nextIndex = currIndex + 1;
        this.setState({
            diagnosticStep: DiagnosticSteps[nextIndex],
            displayItems: DiagnosticSteps[nextIndex].displayItems
        });

        if (DiagnosticSteps[nextIndex].stepName === "FINAL_STEP") { 
            fetch('/api/diagnostic/complete');
        }

    }
    handleItemClick(target: any) { 
        const displayItems = this.state.displayItems!;
        if (!this.state.diagnosticStep.onlyOne) {
            for (let i = 0; i < displayItems.length; i++) {
                if (displayItems[i].value === target) {
                    displayItems[i].isSelected = !displayItems[i].isSelected;
                }
            }
        } else { 
            for (let i = 0; i < displayItems.length; i++) {
                if (displayItems[i].value === target) {
                    displayItems[i].isSelected = !displayItems[i].isSelected;
                } else { 
                    displayItems[i].isSelected = false;
                }
            }
        }
        this.setState({ displayItems: displayItems });
    }

    calculateSelectedItems(): number{
        const displayItems = this.state.displayItems!;
        let selectedItems = 0;
        for (let i = 0; i < displayItems.length; i++) { 
            if (displayItems[i].isSelected) { 
                selectedItems++;
            }
        }
        return selectedItems;
    }
    render(): JSX.Element {
        if (this.state.diagnosticStep.stepName === 'FINAL_STEP') {
            history.push('/logged_in');
            return <></>;
        }
        if (document.cookie.split(';').filter((item) => item.includes('isLoggedIn=false')).length) {
            history.push('/login');
            return <></>;
        }
            const displayList: any[] = [];
            for (let i = 0; i < this.state.displayItems!.length; i++) {
                displayList.push(<DiagnosticOption onClick={this.handleItemClick} isSelected={this.state.displayItems![i].isSelected} displayText={this.state.displayItems![i].value} />);
            }
        
            return (
                <>
                    <Navbar displayText="YourFit" />
                    <div className="diagnostic-container">
                        <div className="diagnostic-step-title">
                            {this.state.diagnosticStep.stepTitle!}
                    </div>
                        <div className="options-container">
                            {displayList}
                        </div>
                        <DiagnosticContinueButton isDisabled={this.calculateSelectedItems() === 0}onClick={this.calculateNextStep}/>
                    </div>
                </>
            );
    }
}