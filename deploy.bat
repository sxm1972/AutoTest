if "%1"=="" goto usage

if not exist "%1" goto usage

set OUTFOLDER=%1

COPY /Y cm-chat-chatAttentionRetainers.txt %OUTFOLDER%
COPY /Y cm-chat-chatLinks.txt %OUTFOLDER%
COPY /Y cm-chat-chatMessages.txt %OUTFOLDER%
COPY /Y cm-chat-chatWorkTypes.txt %OUTFOLDER%
COPY /Y cm-inbound-inboundSMSWorktypes.txt %OUTFOLDER%
COPY /Y cm-inbound-inboundWorkTypes.txt %OUTFOLDER%
COPY /Y cm-inbound-skillGroups.txt %OUTFOLDER%
COPY /Y cm-main-page.txt %OUTFOLDER%
COPY /Y cm-outbound-dialFilter.txt %OUTFOLDER%
COPY /Y cm-outbound-nanpManager.txt %OUTFOLDER%
COPY /Y cm-outbound-outboundSMSWorktypes.txt %OUTFOLDER%
COPY /Y cm-outbound-outboundVoiceWorktypes.txt %OUTFOLDER%
COPY /Y cm-outbound-timeZoneGroup.txt %OUTFOLDER%
COPY /Y cm-workforce-agentStatusReason.txt %OUTFOLDER%
COPY /Y cm-workforce-personalGreetings.txt %OUTFOLDER%
COPY /Y cm-workforce-skills.txt %OUTFOLDER%
COPY /Y cm-workforce-users.txt %OUTFOLDER%
COPY /Y cm-worktype-contactDataDef.txt %OUTFOLDER%
COPY /Y cm-worktype-contactDataReservedWord.txt %OUTFOLDER%
COPY /Y cm-worktype-disposition.txt %OUTFOLDER%
COPY /Y cm-worktype-dispositionClasses.txt %OUTFOLDER%
COPY /Y cm-worktype-dispositionRoutingPlans.txt %OUTFOLDER%
COPY /Y cm-worktype-holidays.txt %OUTFOLDER%
COPY /Y cm-worktype-personalGreetingsSchedules.txt %OUTFOLDER%
COPY /Y cm-worktype-schedules.txt %OUTFOLDER%
COPY /Y cm-worktype-timeZone.txt %OUTFOLDER%
COPY /Y cm-worktype-voicemailForwardOptions.txt %OUTFOLDER%
COPY /Y helper.txt %OUTFOLDER%
COPY /Y cm-chat-chatAttentionRetainers.json %OUTFOLDER%
COPY /Y cm-chat-chatAttentionRetainersSequencer.json %OUTFOLDER%
COPY /Y cm-chat-chatLinks.json %OUTFOLDER%
COPY /Y cm-chat-chatMessages.json %OUTFOLDER%
COPY /Y cm-chat-chatWorkTypes.json %OUTFOLDER%
COPY /Y cm-inbound-inboundSMSWorktypes.json %OUTFOLDER%
COPY /Y cm-inbound-inboundWorkTypes.json %OUTFOLDER%
COPY /Y cm-inbound-skillGroups.json %OUTFOLDER%
COPY /Y cm-outbound-dialFilter.json %OUTFOLDER%
COPY /Y cm-outbound-nanpManager.json %OUTFOLDER%
COPY /Y cm-outbound-outboundSMSWorktypes.json %OUTFOLDER%
COPY /Y cm-outbound-outboundVoiceWorktypes.json %OUTFOLDER%
COPY /Y cm-outbound-timeZoneGroup.json %OUTFOLDER%
COPY /Y cm-outbound-timeZoneGroupDetail.json %OUTFOLDER%
COPY /Y cm-workforce-agentStatusReason.json %OUTFOLDER%
COPY /Y cm-workforce-personalGreetings.json %OUTFOLDER%
COPY /Y cm-workforce-skills.json %OUTFOLDER%
COPY /Y cm-workforce-users.json %OUTFOLDER%
COPY /Y cm-worktype-contactDataDef.json %OUTFOLDER%
COPY /Y cm-worktype-contactDataReservedWord.json %OUTFOLDER%
COPY /Y cm-worktype-disposition.json %OUTFOLDER%
COPY /Y cm-worktype-dispositionClasses.json %OUTFOLDER%
COPY /Y cm-worktype-dispositionPlanDetail.json %OUTFOLDER%
COPY /Y cm-worktype-dispositionRoutingPlans.json %OUTFOLDER%
COPY /Y cm-worktype-holidays.json %OUTFOLDER%
COPY /Y cm-worktype-personalGreetingsSchedules.json %OUTFOLDER%
COPY /Y cm-worktype-personalGreetingsSchedulesRuntime.json %OUTFOLDER%
COPY /Y cm-worktype-schedule-holidays.json %OUTFOLDER%
COPY /Y cm-worktype-schedule-scheduleRuntime.json %OUTFOLDER%
COPY /Y cm-worktype-schedules.json %OUTFOLDER%
COPY /Y cm-worktype-timeZone.json %OUTFOLDER%
COPY /Y cm-worktype-voicemailForwardOptions.json %OUTFOLDER%
COPY /Y package.json %OUTFOLDER%

cd %OUTFOLDER%

ren *.txt *.js

goto end

:usage
echo deploy <target-folder-name>
echo     - target-folder should exist

:end

