copy ..\cmtest\*.js
copy ..\cmtest\*.json

REN cm-chat-chatAttentionRetainers.js cm-chat-chatAttentionRetainers.txt
REN cm-chat-chatLinks.js cm-chat-chatLinks.txt
REN cm-chat-chatMessages.js cm-chat-chatMessages.txt
REN cm-chat-chatWorkTypes.js cm-chat-chatWorkTypes.txt
REN cm-inbound-inboundSMSWorktypes.js cm-inbound-inboundSMSWorktypes.txt
REN cm-inbound-inboundWorkTypes.js cm-inbound-inboundWorkTypes.txt
REN cm-inbound-skillGroups.js cm-inbound-skillGroups.txt
REN cm-main-page.js cm-main-page.txt
REN cm-outbound-dialFilter.js cm-outbound-dialFilter.txt
REN cm-outbound-nanpManager.js cm-outbound-nanpManager.txt
REN cm-outbound-outboundSMSWorktypes.js cm-outbound-outboundSMSWorktypes.txt
REN cm-outbound-outboundVoiceWorktypes.js cm-outbound-outboundVoiceWorktypes.txt
REN cm-outbound-timeZoneGroup.js cm-outbound-timeZoneGroup.txt
REN cm-workforce-agentStatusReason.js cm-workforce-agentStatusReason.txt
REN cm-workforce-personalGreetings.js cm-workforce-personalGreetings.txt
REN cm-workforce-skills.js cm-workforce-skills.txt
REN cm-workforce-users.js cm-workforce-users.txt
REN cm-worktype-contactDataDef.js cm-worktype-contactDataDef.txt
REN cm-worktype-contactDataReservedWord.js cm-worktype-contactDataReservedWord.txt
REN cm-worktype-disposition.js cm-worktype-disposition.txt
REN cm-worktype-dispositionClasses.js cm-worktype-dispositionClasses.txt
REN cm-worktype-dispositionRoutingPlans.js cm-worktype-dispositionRoutingPlans.txt
REN cm-worktype-holidays.js cm-worktype-holidays.txt
REN cm-worktype-personalGreetingsSchedules.js cm-worktype-personalGreetingsSchedules.txt
REN cm-worktype-schedules.js cm-worktype-schedules.txt
REN cm-worktype-timeZone.js cm-worktype-timeZone.txt
REN cm-worktype-voicemailForwardOptions.js cm-worktype-voicemailForwardOptions.txt
del helper.txt
copy ..\cmtest\helper.js .
REN helper.js helper.txt
del cmauto.zip
zip -D cmauto.zip cm-*.txt helper.txt
zip -D cmauto.zip *.json 
zip -D cmauto.zip deploy.bat

del cm-*.txt
del helper.txt
del *.json