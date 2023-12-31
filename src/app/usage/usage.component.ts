import {Component} from '@angular/core';
import {Organisation} from "../github-api/organisation.model";
import {ActionsBilling} from "../github-api/actions-billing.model";
import {GithubApiService} from "../github-api/github-api.service";

/**
 * Displays usage of Github actions by organization / user
 */
@Component({
  selector: 'app-usage',
  templateUrl: './usage.component.html',
  styleUrls: ['./usage.component.scss']
})
export class UsageComponent {
  data: { org: Organisation, billing: ActionsBilling }[] = [];

  constructor(private githubApiService: GithubApiService) {
  }

  ngOnInit() {
    this.getUsageInformation()
      .catch(console.error);
  }

  private async getUsageInformation() {
    this.data = [];
    const user = await this.githubApiService.getUserAsOrg();
    const userBilling = await this.githubApiService.actionBillingForUser(user.name);
    this.data.push({org: user, billing: userBilling});
    const orgs = await this.githubApiService.listUsersOrg();
    for (let org of orgs) {
      const billing = await this.githubApiService.actionsBillingForOrg(org.name);
      this.data.push({org, billing});
    }
  }
}
