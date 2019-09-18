#!/bin/bash

echo "**Testing Application Layer Unit Tests**"
cd BudgetTracker.BudgetSquirrel.WebApi.Tests
dotnet test --filter "FullyQualifiedName~BudgetTracker.BudgetSquirrel.WebApi.Tests.UnitTests"

echo "**Testing Business Layer Unit Tests**"
cd ..
cd BudgetTracker/Tests/BudgetTracker.Business.Tests
dotnet test --filter "FullyQualifiedName~BudgetTracker.Business.Tests.UnitTests"

echo "**Testing Application Layer Integration Tests**"
cd ../../..
cd BudgetTracker.BudgetSquirrel.WebApi.Tests
dotnet test --filter "FullyQualifiedName~BudgetTracker.BudgetSquirrel.WebApi.Tests.IntegrationTests"
