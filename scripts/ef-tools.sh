#!/bin/bash

BUSINESS_REPO="BudgetTracker"
DATA_PROJ="$BUSINESS_REPO/BudgetSquirrel.Data.EntityFramework"
API_PROJ="BudgetSquirrel.Api"

alias rm_db="rm $API_PROJ/dev.db"

add_migration() {
  cd $DATA_PROJ
  rm -rf Migrations
  cd ../..
  rm_db
  cd $DATA_PROJ
  dotnet ef migrations add InitialCreate --startup-project ../../$API_PROJ/$API_PROJ.csproj
  dotnet ef database update --startup-project ../../$API_PROJ/$API_PROJ.csproj --configuration Development
  cd ../..
}

migrate() {
  cd $DATA_PROJ
  dotnet ef database update --startup-project ../../$API_PROJ/$API_PROJ.csproj --configuration Development
  cd ../..
}
