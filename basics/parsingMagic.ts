const fs = require("fs");

const testData = [
  {
    count: 161,
    failedLeaks: [
      "/Users/rhys.jones/dev/entain-native-apps/app/features/account/screens/__tests__/IDVerificationAlert.test.tsx",
      "/Users/rhys.jones/dev/entain-native-apps/app/features/account/screens/__tests__/AccountWithdrawFast.test.tsx",
      "/Users/rhys.jones/dev/entain-native-apps/app/features/group-mode/components/open-groups/__tests__/OpenGroupFeaturedCardGroup.test.tsx",
      "/Users/rhys.jones/dev/entain-native-apps/app/features/group-mode/components/__tests__/GroupModeGroupPage.test.tsx",
      "/Users/rhys.jones/dev/entain-native-apps/app/features/same-game-multi/components/popular-same-game-multi/__tests__/FeaturedCarousel.test.tsx",
      "/Users/rhys.jones/dev/entain-native-apps/app/features/racing/components/__tests__/RaceScreenSubHeader.test.tsx",
      "/Users/rhys.jones/dev/entain-native-apps/app/features/group-mode/screens/__tests__/GroupModeBetSharing.test.tsx",
      "/Users/rhys.jones/dev/entain-native-apps/neds/app/components/header/__tests__/UserInfoExpanded.test.tsx",
      "/Users/rhys.jones/dev/entain-native-apps/app/features/betslip/components/QuickDeposit/__tests__/QuickDepositForm.test.tsx",
      "/Users/rhys.jones/dev/entain-native-apps/app/features/account/screens/__tests__/AccountWithdrawEFT.test.tsx",
      "/Users/rhys.jones/dev/entain-native-apps/app/features/punter-assist/screens/__tests__/AccountPunterAssistCurfew.test.tsx",
      "/Users/rhys.jones/dev/entain-native-apps/app/features/racing/components/gql/racecard/__tests__/SuggestedRunners.test.tsx",
      "/Users/rhys.jones/dev/entain-native-apps/app/features/bet-share/components/card/details/__tests__/BetShareSingleDetails.test.tsx",
      "/Users/rhys.jones/dev/entain-native-apps/app/features/betting-insights/components/bet-maps/__tests__/BetMapsMapView.test.tsx",
      "/Users/rhys.jones/dev/entain-native-apps/app/features/group-mode/screens/__tests__/GroupModeSettingsDetails.test.tsx",
      "/Users/rhys.jones/dev/entain-native-apps/app/features/group-mode/screens/__tests__/GroupModeGroupedBets.test.tsx",
      "/Users/rhys.jones/dev/entain-native-apps/app/features/social-profiles/components/complete-profile/__tests__/ProfileProgressAndCompletionBanners.test.tsx",
      "/Users/rhys.jones/dev/entain-native-apps/app/features/action-required-alerts/hooks/__tests__/useAccountActionRequiredAlerts.test.tsx",
      "/Users/rhys.jones/dev/entain-native-apps/app/features/content-hub/hooks/__tests__/useAutoRotate.test.tsx",
      "/Users/rhys.jones/dev/entain-native-apps/app/components/header/userTrayRedesign/__tests__/UserInfoExpandedRedesign.test.tsx",
      "/Users/rhys.jones/dev/entain-native-apps/app/features/racing/components/gql/racecard/__tests__/RaceBlogTips.test.tsx",
      "/Users/rhys.jones/dev/entain-native-apps/ladbrokes/app/components/header/__tests__/BetslipButton.test.tsx",
      "/Users/rhys.jones/dev/entain-native-apps/app/features/auth/components/__tests__/Signup.test.tsx",
      "/Users/rhys.jones/dev/entain-native-apps/app/features/account/screens/__tests__/AccountWithdrawEMLCard.test.tsx",
      "/Users/rhys.jones/dev/entain-native-apps/app/features/group-betting/screens/__test__/CreateBettingGroupSelectGroup.test.tsx",
      "/Users/rhys.jones/dev/entain-native-apps/shared/components/header/__tests__/UserInfoExpanded.test.tsx",
      "/Users/rhys.jones/dev/entain-native-apps/ladbrokes/app/components/header/__tests__/UserInfoExpanded.test.tsx",
      "/Users/rhys.jones/dev/entain-native-apps/tabnz/app/components/header/__tests__/UserInfoExpanded.test.tsx",
      "/Users/rhys.jones/dev/entain-native-apps/app/features/racing/components/gql/resulted/__tests__/ResultedFinalField.test.tsx",
      "/Users/rhys.jones/dev/entain-native-apps/app/components/core/VideoPlayer/FullScreen/__tests__/FullScreenVideoController.test.tsx",
      "/Users/rhys.jones/dev/entain-native-apps/app/features/racing/screens/__tests__/MeetingRaces.test.tsx",
      "/Users/rhys.jones/dev/entain-native-apps/app/features/offers/components/__tests__/PostSignupOffers.test.tsx",
      "/Users/rhys.jones/dev/entain-native-apps/app/features/group-mode/components/open-groups/__tests__/OpenGroupsTabView.test.tsx",
      "/Users/rhys.jones/dev/entain-native-apps/app/features/notification-centre/screens/__tests__/NotificationCentreHome.test.tsx",
      "/Users/rhys.jones/dev/entain-native-apps/app/features/group-betting/components/summary-card/__test__/SummaryCardPrimaryButton.test.tsx",
      "/Users/rhys.jones/dev/entain-native-apps/app/features/group-betting/screens/__test__/CreateBettingGroupBuyIn.test.tsx",
      "/Users/rhys.jones/dev/entain-native-apps/app/features/social-profiles/components/__tests__/ProfileEntryFromMenuPage.test.tsx",
      "/Users/rhys.jones/dev/entain-native-apps/app/features/racing/components/gql/racecard/final-field/__tests__/FinalFieldSortHeader.test.tsx",
      "/Users/rhys.jones/dev/entain-native-apps/app/features/group-mode/components/chat/chatFilter/__tests__/GroupModeChatFilterBottomSheet.test.tsx",
      "/Users/rhys.jones/dev/entain-native-apps/app/features/group-mode/components/chat/list/__tests__/MessageList.test.tsx",
      "/Users/rhys.jones/dev/entain-native-apps/app/components/header/userTrayRedesign/__tests__/UserTrayUserInfo.test.tsx",
      "/Users/rhys.jones/dev/entain-native-apps/app/features/group-mode/components/__tests__/NavigationChips.test.tsx",
      "/Users/rhys.jones/dev/entain-native-apps/app/features/betslip/components/QuickDeposit/__tests__/QuickDeposit.test.tsx",
      "/Users/rhys.jones/dev/entain-native-apps/app/features/action-required-alerts/hooks/__tests__/useActionRequiredAlertsBadgeCount.test.tsx",
      "/Users/rhys.jones/dev/entain-native-apps/app/features/racing/components/gql/racecard/__tests__/RaceBlogTipsContainer.test.tsx",
      "/Users/rhys.jones/dev/entain-native-apps/app/components/menu/__tests__/MenuTabBarIcon.test.tsx",
      "/Users/rhys.jones/dev/entain-native-apps/app/features/offers/screens/__tests__/PostSignupOffersTerms.test.tsx",
      "/Users/rhys.jones/dev/entain-native-apps/app/features/account/components/__tests__/AddNewBankAccount.test.tsx",
      "/Users/rhys.jones/dev/entain-native-apps/app/components/core/VideoPlayer/__tests__/MyBetsList.test.tsx",
      "/Users/rhys.jones/dev/entain-native-apps/app/features/account/components/deposit/__tests__/CreditCardRemovedModal.test.tsx",
      "/Users/rhys.jones/dev/entain-native-apps/app/features/social-profiles/screens/__tests__/ChangeBio.test.tsx",
      "/Users/rhys.jones/dev/entain-native-apps/app/components/core/GeoGate/__tests__/GeoGate.test.tsx",
      "/Users/rhys.jones/dev/entain-native-apps/app/features/offers/components/__tests__/PostSignupOffersList.test.tsx",
      "/Users/rhys.jones/dev/entain-native-apps/app/features/racing-club/components/racing-club-ballot/components/__tests__/BallotsClosingSoon.test.tsx",
      "/Users/rhys.jones/dev/entain-native-apps/app/features/social-profiles/components/activity-feed/__tests__/ActivityFeeds.test.tsx",
      "/Users/rhys.jones/dev/entain-native-apps/app/features/account/components/accountDetails/__tests__/AccountDetailsV2.test.tsx",
      "/Users/rhys.jones/dev/entain-native-apps/app/features/social-profiles/components/activity-feed/__tests__/ActivityListItem.test.tsx",
      "/Users/rhys.jones/dev/entain-native-apps/app/features/account/components/userSettings/__tests__/AccountUserSettingsV2.test.tsx",
      "/Users/rhys.jones/dev/entain-native-apps/app/features/social-profiles/components/followers-following/__tests__/ProfilesTab.test.tsx",
      "/Users/rhys.jones/dev/entain-native-apps/app/features/social-profiles/components/social-feed-home-screen/__tests__/AmbassadorList.test.tsx",
      "/Users/rhys.jones/dev/entain-native-apps/app/features/social-profiles/components/complete-profile/__tests__/TasksProgressBanner.test.tsx",
      "/Users/rhys.jones/dev/entain-native-apps/app/features/sports/components/gql/__tests__/NextToGoList.test.tsx",
      "/Users/rhys.jones/dev/entain-native-apps/app/features/group-mode/components/user/__tests__/UserDetails.test.tsx",
      "/Users/rhys.jones/dev/entain-native-apps/app/features/group-mode/screens/open-groups/__tests__/OpenGroupsJoinGroup.test.tsx",
      "/Users/rhys.jones/dev/entain-native-apps/app/features/group-mode/screens/join-group/__tests__/GroupModeNewUser.test.tsx",
      "/Users/rhys.jones/dev/entain-native-apps/app/features/sports/components/gql/__tests__/SportsLiveEventCardItem.test.tsx",
      "/Users/rhys.jones/dev/entain-native-apps/app/features/group-mode/components/message/__tests__/GroupModeMessage.test.tsx",
      "/Users/rhys.jones/dev/entain-native-apps/app/features/racing/components/gql/__tests__/NextToGoCarouselEntrants.test.tsx",
      "/Users/rhys.jones/dev/entain-native-apps/app/features/group-betting/components/summary-card/__test__/SummaryCardGroupChat.test.tsx",
      "/Users/rhys.jones/dev/entain-native-apps/app/features/group-betting/components/summary-card/__test__/SummaryCardManageGroup.test.tsx",
      "/Users/rhys.jones/dev/entain-native-apps/app/features/racing/components/gql/__tests__/ExclusiveOddsRaceRunner.test.tsx",
      "/Users/rhys.jones/dev/entain-native-apps/app/features/group-mode/components/open-groups/__tests__/OpenGroupList.test.tsx",
      "/Users/rhys.jones/dev/entain-native-apps/app/features/group-betting/screens/leave-group/__test__/GroupBettingLeaveGroup.test.tsx",
      "/Users/rhys.jones/dev/entain-native-apps/app/features/group-mode/components/open-groups/__tests__/OpenGroupAlerts.test.tsx",
      "/Users/rhys.jones/dev/entain-native-apps/app/features/group-mode/utils/push-notifications/__tests__/index.test.ts",
      "/Users/rhys.jones/dev/entain-native-apps/app/features/group-betting/components/__test__/GroupBettingList.test.tsx",
      "/Users/rhys.jones/dev/entain-native-apps/app/features/search/components/__tests__/ResultsSection.test.tsx",
      "/Users/rhys.jones/dev/entain-native-apps/app/features/group-mode/screens/__tests__/GroupModeGroup.test.tsx",
      "/Users/rhys.jones/dev/entain-native-apps/app/features/venue-mode/screens/__tests__/VenueModeJoinGroup.test.tsx",
      "/Users/rhys.jones/dev/entain-native-apps/app/features/group-mode/screens/__tests__/GroupModeSettingsBottomSheet.test.tsx",
      "/Users/rhys.jones/dev/entain-native-apps/app/features/group-mode/screens/__tests__/GroupModeHome.test.tsx",
      "/Users/rhys.jones/dev/entain-native-apps/app/features/group-mode/components/__tests__/GroupModeGroupTabView.test.tsx",
      "/Users/rhys.jones/dev/entain-native-apps/app/features/group-betting/components/__test__/GroupBettingDetails.test.tsx",
      "/Users/rhys.jones/dev/entain-native-apps/app/features/social-bet-sharing/components/__tests__/SingleSelectionDetails.test.tsx",
      "/Users/rhys.jones/dev/entain-native-apps/app/features/sports/screens/__tests__/SportsFutures.test.tsx",
      "/Users/rhys.jones/dev/entain-native-apps/app/features/social-bet-sharing/utils/__tests__/allBetsBettable.test.tsx",
      "/Users/rhys.jones/dev/entain-native-apps/app/features/notification-centre/hooks/__tests__/useNotificationsQuery.test.tsx",
      "/Users/rhys.jones/dev/entain-native-apps/app/features/betslip/components/__tests__/BetslipFooter.test.tsx",
      "/Users/rhys.jones/dev/entain-native-apps/app/features/account/screens/__tests__/AccountPreferenceCentre.test.tsx",
      "/Users/rhys.jones/dev/entain-native-apps/app/features/account/screens/__tests__/AccountDepositApplePay.test.tsx",
      "/Users/rhys.jones/dev/entain-native-apps/app/features/account/screens/__tests__/AccountDepositEMLCard.test.tsx",
      "/Users/rhys.jones/dev/entain-native-apps/app/features/notification-centre/hooks/__tests__/useAcknowledgeNotificationsMutation.test.tsx",
      "/Users/rhys.jones/dev/entain-native-apps/app/features/promotions/hooks/__tests__/useContenfulPromos.test.tsx",
      "/Users/rhys.jones/dev/entain-native-apps/app/features/racing-club/screens/__tests__/RacingClubRunner.test.tsx",
      "/Users/rhys.jones/dev/entain-native-apps/app/features/account/components/__tests__/AccountDepositCreditCardForm.test.tsx",
      "/Users/rhys.jones/dev/entain-native-apps/app/features/account/screens/__tests__/AccountDepositBPAY.test.tsx",
      "/Users/rhys.jones/dev/entain-native-apps/app/features/account/screens/__tests__/AccountWithdrawFastResult.test.tsx",
      "/Users/rhys.jones/dev/entain-native-apps/app/features/betslip/hooks/__tests__/useHandleDeposit.test.tsx",
      "/Users/rhys.jones/dev/entain-native-apps/app/features/account/screens/__tests__/AccountWithdrawFastNew.test.tsx",
      "/Users/rhys.jones/dev/entain-native-apps/app/features/account/screens/__tests__/AccountDepositEFT.test.tsx",
      "/Users/rhys.jones/dev/entain-native-apps/app/features/account/screens/__tests__/AccountWithdrawPayPal.test.tsx",
      "/Users/rhys.jones/dev/entain-native-apps/app/features/account/components/__tests__/AccountWithdrawEFTForm.test.tsx",
      "/Users/rhys.jones/dev/entain-native-apps/app/features/account/screens/__tests__/AccountDepositPayPal.test.tsx",
      "/Users/rhys.jones/dev/entain-native-apps/app/features/account/screens/__tests__/AccountDepositCreditCards.test.tsx",
      "/Users/rhys.jones/dev/entain-native-apps/app/features/account/screens/__tests__/AccountWithdrawFastWithdraw.test.tsx",
      "/Users/rhys.jones/dev/entain-native-apps/app/features/betslip/components/__tests__/BestlipExoticsBetContainer.test.tsx",
      "/Users/rhys.jones/dev/entain-native-apps/app/features/blackbook/screens/__tests__/BlackbookSearchModal.test.tsx",
      "/Users/rhys.jones/dev/entain-native-apps/app/features/venue-lander/screens/__tests__/VenueLander.test.tsx",
      "/Users/rhys.jones/dev/entain-native-apps/app/features/account/screens/__tests__/AccountDepositCashInCreate.test.tsx",
      "/Users/rhys.jones/dev/entain-native-apps/app/features/betslip/components/__tests__/BetslipGroup.test.tsx",
      "/Users/rhys.jones/dev/entain-native-apps/app/features/live-racing/components/__test__/LiveRacingQuickBetSheet.test.tsx",
      "/Users/rhys.jones/dev/entain-native-apps/app/features/betslip/components/__tests__/BetslipSameGameMultisItem.test.tsx",
      "/Users/rhys.jones/dev/entain-native-apps/app/features/account/screens/__tests__/AccountHome.test.tsx",
      "/Users/rhys.jones/dev/entain-native-apps/app/features/promotions/components/__tests__/PromotionIndicatorTag.test.tsx",
      "/Users/rhys.jones/dev/entain-native-apps/app/features/blackbook/screens/__tests__/BlackbookHome.test.tsx",
      "/Users/rhys.jones/dev/entain-native-apps/app/features/promotions/hooks/__tests__/useEventPromos.test.tsx",
      "/Users/rhys.jones/dev/entain-native-apps/app/features/racing-club/components/__tests__/RacingClubFeatureBanner.test.tsx",
      "/Users/rhys.jones/dev/entain-native-apps/app/features/account/screens/__tests__/AccountDepositGooglePay.test.tsx",
      "/Users/rhys.jones/dev/entain-native-apps/app/features/blackbook/components/__tests__/BlackbookEditDeleteEntryBottomSheet.test.tsx",
      "/Users/rhys.jones/dev/entain-native-apps/neds/app/screens/toolbox/__tests__/BetslipToolboxList.test.tsx",
      "/Users/rhys.jones/dev/entain-native-apps/shared/components/header/__tests__/BetslipButton.test.tsx",
      "/Users/rhys.jones/dev/entain-native-apps/app/features/social-profiles/components/__tests__/FollowAndReportBottomSheet.test.tsx",
      "/Users/rhys.jones/dev/entain-native-apps/__tests__/App.test.tsx",
      "/Users/rhys.jones/dev/entain-native-apps/neds/app/hooks/toolbox/__tests__/useToolboxDefinitions.test.tsx",
      "/Users/rhys.jones/dev/entain-native-apps/app/components/transactions/__tests__/BetCard.test.tsx",
      "/Users/rhys.jones/dev/entain-native-apps/neds/app/screens/toolbox/__tests__/ToolboxDetails.test.tsx",
      "/Users/rhys.jones/dev/entain-native-apps/neds/app/context/toolbox/__tests__/useToolboxConfig.test.tsx",
      "/Users/rhys.jones/dev/entain-native-apps/tabnz/app/hooks/toolbox/__tests__/useToolboxDefinitions.test.tsx",
      "/Users/rhys.jones/dev/entain-native-apps/app/screens/__tests__/Menu.test.tsx",
      "/Users/rhys.jones/dev/entain-native-apps/app/features/social-profiles/components/__tests__/MyProfileView.test.tsx",
      "/Users/rhys.jones/dev/entain-native-apps/app/features/social-profiles/components/__tests__/NotificationTab.test.tsx",
      "/Users/rhys.jones/dev/entain-native-apps/app/features/social-profiles/screens/__tests__/CreateNewProfile.test.tsx",
      "/Users/rhys.jones/dev/entain-native-apps/neds/app/screens/toolbox/__tests__/ToolboxList.test.tsx",
      "/Users/rhys.jones/dev/entain-native-apps/app/context/video/__tests__/VideoProvider.test.tsx",
      "/Users/rhys.jones/dev/entain-native-apps/tabnz/app/screens/toolbox/__tests__/BackUpEntrantSelection.test.tsx",
      "/Users/rhys.jones/dev/entain-native-apps/neds/app/screens/toolbox/__tests__/BackUpEntrantSelection.test.tsx",
      "/Users/rhys.jones/dev/entain-native-apps/app/hooks/betting/__tests__/useVuexPriceButtonState.test.tsx",
      "/Users/rhys.jones/dev/entain-native-apps/tabnz/app/screens/toolbox/__tests__/ToolboxList.test.tsx",
      "/Users/rhys.jones/dev/entain-native-apps/tabnz/app/components/header/__tests__/BetslipButton.test.tsx",
      "/Users/rhys.jones/dev/entain-native-apps/tabnz/app/screens/toolbox/__tests__/ToolboxDetails.test.tsx",
      "/Users/rhys.jones/dev/entain-native-apps/tabnz/app/screens/toolbox/__tests__/BetslipToolboxList.test.tsx",
      "/Users/rhys.jones/dev/entain-native-apps/app/components/header/__tests__/UserInfoToggle.test.tsx",
      "/Users/rhys.jones/dev/entain-native-apps/app/features/social-profiles/components/__tests__/SocialProfileHeader.test.tsx",
      "/Users/rhys.jones/dev/entain-native-apps/tabnz/app/hooks/toolbox/__tests__/useToolboxConfigOnFocus.test.tsx",
      "/Users/rhys.jones/dev/entain-native-apps/neds/app/components/header/__tests__/BetslipButton.test.tsx",
      "/Users/rhys.jones/dev/entain-native-apps/app/features/social-profiles/screens/__tests__/DeactivateProfile.test.tsx",
      "/Users/rhys.jones/dev/entain-native-apps/app/features/social-profiles/screens/__tests__/ProfileHome.test.tsx",
      "/Users/rhys.jones/dev/entain-native-apps/neds/app/hooks/toolbox/__tests__/useToolboxConfigOnFocus.test.tsx",
      "/Users/rhys.jones/dev/entain-native-apps/app/features/social-profiles/components/__tests__/FollowButton.test.tsx",
      "/Users/rhys.jones/dev/entain-native-apps/app/features/native-live-chat/components/__test__/PostChatSurvey.test.tsx",
      "/Users/rhys.jones/dev/entain-native-apps/app/features/social-profiles/components/__tests__/SocialProfilesErrorScreen.test.tsx",
      "/Users/rhys.jones/dev/entain-native-apps/app/features/any-team-vs-any-team/screens/__tests__/SportsAnyTeamVsAnyTeam.test.tsx",
      "/Users/rhys.jones/dev/entain-native-apps/app/features/social-profiles/hooks/__tests__/useDeleteSocialProfileActivityReaction.test.tsx",
      "/Users/rhys.jones/dev/entain-native-apps/app/features/social-profiles/hooks/__tests__/useUpdateSocialProfileActivityReaction.test.tsx",
      "/Users/rhys.jones/dev/entain-native-apps/app/features/social-profiles/hooks/__tests__/useCreateSocialProfileActivityReaction.test.tsx",
      "/Users/rhys.jones/dev/entain-native-apps/app/features/group-betting/components/__test__/GroupBettingLeaveGroupConfirmation.test.tsx",
      "/Users/rhys.jones/dev/entain-native-apps/app/features/group-betting/components/__test__/GroupBettingCreateGroupBuyIn.test.tsx",
      "/Users/rhys.jones/dev/entain-native-apps/app/features/racing/screens/__tests__/ExtrasMarketCard.test.tsx",
      "/Users/rhys.jones/dev/entain-native-apps/app/features/group-betting/components/__test__/GroupBettingSummaryCardAction.test.tsx",
      "/Users/rhys.jones/dev/entain-native-apps/app/features/group-betting/components/__test__/GroupBettingManageGroup.test.tsx",
      "/Users/rhys.jones/dev/entain-native-apps/app/features/account/hooks/__tests__/useSubmitCreditCard.test.tsx",
    ],
  },
];

// Extract only the file names from the paths
const testFileNames = testData[0].failedLeaks.map((path) => {
  const parts = path.split("/");
  return parts[parts.length - 1];
});

console.log(testFileNames);

// Write the test file names to a text file
fs.writeFileSync("testFileNames.txt", testFileNames.join("\n"));

console.log("Test file names have been written to testFileNames.txt");